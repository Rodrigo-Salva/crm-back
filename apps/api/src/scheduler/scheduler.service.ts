import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from '@crm/shared';
import { EmailService, ImapService } from '@crm/email';
import { NotificationsService } from '@crm/notifications';
import { SubscriptionsService } from '@crm/subscriptions';
import { PlaybooksService } from '@crm/playbooks';
import { LeadsService } from '@crm/leads';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly imapService: ImapService,
    private readonly notificationsService: NotificationsService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly playbooksService: PlaybooksService,
    private readonly leadsService: LeadsService,
  ) {}

  onModuleInit() {
    cron.schedule('*/5 * * * *', () => this.checkReminders());
    cron.schedule('*/10 * * * *', () => this.syncImap());
    cron.schedule('0 9 * * *', () => this.checkStaleLeads());
    cron.schedule('0 6 * * *', () => this.generateRecurringInvoices());
    cron.schedule('0 7 * * *', () => this.recalculateHealthScores());
    cron.schedule('0 8 * * *', () => this.notifyUpcomingRenewalsAndOverdueInvoices());
    cron.schedule('*/15 * * * *', () => this.checkTicketSlaBreaches());
    this.logger.log('Reminder scheduler started (every 5 minutes)');
    this.logger.log('IMAP sync scheduler started (every 10 minutes)');
    this.logger.log('Stale lead follow-up scheduler started (daily at 09:00)');
    this.logger.log('Recurring invoice generator started (daily at 06:00)');
    this.logger.log('Customer health score recalculation started (daily at 07:00)');
    this.logger.log('Invoice renewal/overdue check started (daily at 08:00)');
    this.logger.log('Ticket SLA breach check started (every 15 minutes)');
  }

  private static readonly SLA_ESCALATION_GRACE_HOURS = 1;

  private async checkTicketSlaBreaches() {
    try {
      const now = new Date();
      const tenants = await this.prisma.tenant.findMany({ select: { id: true } });

      for (const tenant of tenants) {
        const openTickets = await this.prisma.ticket.findMany({
          where: {
            tenantId: tenant.id,
            status: { notIn: ['resolved', 'closed'] },
            OR: [
              { slaDeadline: { lt: now }, slaBreachNotifiedAt: null },
              { firstResponseDeadline: { lt: now }, firstRespondedAt: null, slaBreachNotifiedAt: null },
            ],
          },
          include: { team: true },
        });

        for (const ticket of openTickets) {
          if (ticket.assignedTo) {
            await this.notificationsService.create({
              userId: ticket.assignedTo,
              title: 'SLA vencido',
              body: `El ticket #${ticket.number} "${ticket.subject}" superó el tiempo de SLA.`,
              link: `/tickets/${ticket.id}`,
            });
          }
          await this.prisma.ticket.update({ where: { id: ticket.id }, data: { slaBreachNotifiedAt: now } });
        }

        const graceMs = SchedulerService.SLA_ESCALATION_GRACE_HOURS * 3600000;
        const escalationCutoff = new Date(now.getTime() - graceMs);
        const toEscalate = await this.prisma.ticket.findMany({
          where: {
            tenantId: tenant.id,
            status: { notIn: ['resolved', 'closed'] },
            escalatedAt: null,
            slaDeadline: { lt: escalationCutoff },
          },
          include: { team: true },
        });

        for (const ticket of toEscalate) {
          const supervisorId = ticket.team?.leadId;
          if (supervisorId) {
            await this.notificationsService.create({
              userId: supervisorId,
              title: 'Ticket escalado',
              body: `El ticket #${ticket.number} "${ticket.subject}" lleva más de ${SchedulerService.SLA_ESCALATION_GRACE_HOURS}h vencido sin resolverse.`,
              link: `/tickets/${ticket.id}`,
            });
          } else {
            const admins = await this.prisma.user.findMany({
              where: { tenantId: tenant.id, role: { in: ['admin', 'superadmin'] } },
              select: { id: true },
            });
            for (const admin of admins) {
              await this.notificationsService.create({
                userId: admin.id,
                title: 'Ticket escalado',
                body: `El ticket #${ticket.number} "${ticket.subject}" lleva más de ${SchedulerService.SLA_ESCALATION_GRACE_HOURS}h vencido sin resolverse y su equipo no tiene un líder asignado.`,
                link: `/tickets/${ticket.id}`,
              });
            }
          }
          await this.prisma.ticket.update({ where: { id: ticket.id }, data: { escalatedAt: now } });
        }
      }
    } catch (err) {
      this.logger.error('Ticket SLA breach check failed', err);
    }
  }

  private async recalculateHealthScores() {
    try {
      const tenants = await this.prisma.tenant.findMany({ select: { id: true } });

      for (const tenant of tenants) {
        const leads = await this.prisma.lead.findMany({
          where: { tenantId: tenant.id, contracts: { some: {} } },
          select: { id: true },
        });

        for (const lead of leads) {
          try {
            await this.leadsService.recalculateHealth(lead.id, { tenantId: tenant.id });
          } catch (err) {
            this.logger.error(`Health score recalculation failed for lead ${lead.id}`, err);
          }
        }
      }
    } catch (err) {
      this.logger.error('Health score recalculation batch failed', err);
    }
  }

  private async generateRecurringInvoices() {
    try {
      const now = new Date();
      const tenants = await this.prisma.tenant.findMany({ select: { id: true } });

      for (const tenant of tenants) {
        const dueSubscriptions = await this.prisma.subscription.findMany({
          where: {
            tenantId: tenant.id,
            status: 'active',
            nextBillingDate: { lte: now },
            contract: { status: 'accepted' },
          },
          select: { id: true },
        });

        for (const subscription of dueSubscriptions) {
          try {
            await this.subscriptionsService.generateInvoice(subscription.id, tenant.id);
          } catch (err) {
            this.logger.error(`Failed to generate invoice for subscription ${subscription.id}`, err);
          }
        }
      }
    } catch (err) {
      this.logger.error('Recurring invoice generation failed', err);
    }
  }

  private static readonly DUNNING_REMINDER_INTERVAL_DAYS = 3;
  private static readonly DUNNING_CANCEL_AFTER_DAYS = 15;

  private async notifyUpcomingRenewalsAndOverdueInvoices() {
    try {
      const now = new Date();
      const tenants = await this.prisma.tenant.findMany({ select: { id: true } });

      for (const tenant of tenants) {
        const newlyOverdueInvoices = await this.prisma.invoice.findMany({
          where: {
            tenantId: tenant.id,
            status: { in: ['pending', 'sent'] },
            dueDate: { lt: now },
            subscriptionId: { not: null },
          },
          include: { subscription: { include: { contract: { include: { lead: true } } } } },
        });

        for (const invoice of newlyOverdueInvoices) {
          await this.prisma.invoice.update({ where: { id: invoice.id }, data: { status: 'overdue' } });
          const subscription = invoice.subscription!;
          await this.notificationsService.create({
            userId: subscription.contract.createdById,
            title: 'Factura vencida',
            body: `La factura ${invoice.number} de ${subscription.contract.lead.name} está vencida.`,
            link: `/contracts/${subscription.contractId}`,
          });
        }

        await this.runDunning(tenant.id, now);

        const soon = new Date(now.getTime() + 3 * 24 * 3600000);
        const upcomingRenewals = await this.prisma.subscription.findMany({
          where: {
            tenantId: tenant.id,
            status: 'active',
            nextBillingDate: { gte: now, lte: soon },
            contract: { status: 'accepted' },
          },
          include: { contract: { include: { lead: true } } },
        });

        for (const subscription of upcomingRenewals) {
          await this.notificationsService.create({
            userId: subscription.contract.createdById,
            title: 'Renovación próxima',
            body: `La suscripción del contrato ${subscription.contract.number} (${subscription.contract.lead.name}) se renueva pronto.`,
            link: `/contracts/${subscription.contractId}`,
          });

          await this.playbooksService.startRunsForTrigger('renewal_upcoming', {
            leadId: subscription.contract.leadId,
            contractId: subscription.contractId,
            tenantId: tenant.id,
          });
        }
      }
    } catch (err) {
      this.logger.error('Renewal/overdue invoice check failed', err);
    }
  }

  private async runDunning(tenantId: string, now: Date) {
    const overdueInvoices = await this.prisma.invoice.findMany({
      where: { tenantId, status: 'overdue', subscriptionId: { not: null } },
      include: { subscription: { include: { contract: { include: { lead: true } } } } },
    });

    for (const invoice of overdueInvoices) {
      const daysOverdue = Math.floor((now.getTime() - invoice.dueDate.getTime()) / (24 * 3600000));
      const subscription = invoice.subscription!;
      const lead = subscription.contract.lead;

      if (daysOverdue >= SchedulerService.DUNNING_CANCEL_AFTER_DAYS) {
        if (subscription.status === 'active') {
          await this.prisma.subscription.update({
            where: { id: subscription.id },
            data: { status: 'cancelled', cancelledAt: now },
          });
          await this.notificationsService.create({
            userId: subscription.contract.createdById,
            title: 'Suscripción cancelada por falta de pago',
            body: `La suscripción del contrato ${subscription.contract.number} (${lead.name}) se canceló tras ${daysOverdue} días de mora en la factura ${invoice.number}.`,
            link: `/contracts/${subscription.contractId}`,
          });
        }
        continue;
      }

      const isReminderDay = daysOverdue > 0 && daysOverdue % SchedulerService.DUNNING_REMINDER_INTERVAL_DAYS === 0;
      const alreadyRemindedToday = invoice.lastReminderAt && this.isSameDay(invoice.lastReminderAt, now);
      if (isReminderDay && !alreadyRemindedToday && lead.email) {
        try {
          await this.emailService.sendEmail(
            {
              to: lead.email,
              subject: `Recordatorio de pago pendiente: factura ${invoice.number}`,
              body: `<p>Hola ${lead.name},</p><p>La factura <strong>${invoice.number}</strong> está vencida desde hace ${daysOverdue} días. Por favor realiza tu pago a la brevedad para evitar la suspensión del servicio.</p>`,
            },
            tenantId,
          );
        } catch (err) {
          this.logger.warn(`Failed to send dunning reminder email to ${lead.email}`);
        }

        await this.prisma.invoice.update({
          where: { id: invoice.id },
          data: { remindersSent: { increment: 1 }, lastReminderAt: now },
        });
      }
    }
  }

  private isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  private async checkStaleLeads() {
    const DEFAULT_STALE_DAYS = 5;
    try {
      const tenants = await this.prisma.tenant.findMany({ select: { id: true } });

      for (const tenant of tenants) {
        const setting = await this.prisma.tenantSetting.findUnique({
          where: { key_tenantId: { key: 'staleLeadDays', tenantId: tenant.id } },
        });
        const staleDays = setting ? parseInt(setting.value, 10) || DEFAULT_STALE_DAYS : DEFAULT_STALE_DAYS;
        const cutoff = new Date(Date.now() - staleDays * 24 * 3600000);

        const closedStages = await this.prisma.pipelineStage.findMany({
          where: { tenantId: tenant.id, OR: [{ isWon: true }, { isLost: true }] },
          select: { name: true },
        });
        const closedNames = closedStages.map((s) => s.name);

        const leads = await this.prisma.lead.findMany({
          where: { tenantId: tenant.id, status: { notIn: closedNames } },
          include: { activities: { orderBy: { createdAt: 'desc' }, take: 1 } },
        });

        for (const lead of leads) {
          const lastActivity = lead.activities[0]?.createdAt ?? lead.updatedAt;
          if (lastActivity > cutoff) continue;

          const existingTask = await this.prisma.task.findFirst({
            where: {
              tenantId: tenant.id,
              relatedType: 'lead',
              relatedId: lead.id,
              status: { not: 'completed' },
            },
          });
          if (existingTask) continue;

          await this.prisma.task.create({
            data: {
              title: `Dar seguimiento a ${lead.name}`,
              description: `Este lead no ha tenido actividad en ${staleDays} o más días.`,
              status: 'pending',
              priority: 'medium',
              dueDate: new Date(),
              relatedType: 'lead',
              relatedId: lead.id,
              assigneeId: lead.ownerId,
              tenantId: tenant.id,
            },
          });

          await this.notificationsService.create({
            userId: lead.ownerId,
            title: 'Lead sin seguimiento',
            body: `"${lead.name}" no ha tenido actividad reciente. Se creó una tarea de seguimiento.`,
            link: `/leads/${lead.id}`,
          });
        }
      }
    } catch (err) {
      this.logger.error('Stale lead check failed', err);
    }
  }

  private async syncImap() {
    try {
      const count = await this.imapService.syncAll();
      if (count > 0) this.logger.log(`IMAP sync: ${count} new emails`);
    } catch (err) {
      this.logger.error('IMAP sync failed', err);
    }
  }

  private async checkReminders() {
    try {
      const now = new Date();
      const reminders = await this.prisma.reminder.findMany({
        where: {
          sent: false,
          activity: {
            dueDate: { not: null },
            done: false,
          },
        },
        include: {
          activity: { select: { id: true, subject: true, dueDate: true } },
          user: { select: { id: true, email: true, name: true, tenantId: true } },
        },
      });

      for (const reminder of reminders) {
        const dueDate = reminder.activity.dueDate;
        if (!dueDate) continue;

        const diffMs = dueDate.getTime() - now.getTime();
        const diffMin = Math.floor(diffMs / 60000);

        if (diffMin <= reminder.minutesBefore && diffMin > -5) {
          await this.notificationsService.create({
            userId: reminder.userId,
            title: `Recordatorio: ${reminder.activity.subject}`,
            body: `La actividad "${reminder.activity.subject}" vence en breve.`,
            link: `/activities?id=${reminder.activity.id}`,
          });

          try {
            await this.emailService.sendEmail(
              {
                to: reminder.user.email,
                subject: `Recordatorio: ${reminder.activity.subject}`,
                body: `<p>Hola ${reminder.user.name},</p><p>Recuérdale: <strong>${reminder.activity.subject}</strong> está por vencer.</p>`,
              },
              reminder.user.tenantId,
            );
          } catch (err) {
            this.logger.warn(`Failed to send reminder email to ${reminder.user.email}`);
          }

          await this.prisma.reminder.update({
            where: { id: reminder.id },
            data: { sent: true },
          });
        }
      }
    } catch (err) {
      this.logger.error('Reminder check failed', err);
    }
  }
}
