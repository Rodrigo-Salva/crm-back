import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from '@crm/shared';
import { EmailService, ImapService } from '@crm/email';
import { NotificationsService } from '@crm/notifications';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly imapService: ImapService,
    private readonly notificationsService: NotificationsService,
  ) {}

  onModuleInit() {
    cron.schedule('*/5 * * * *', () => this.checkReminders());
    cron.schedule('*/10 * * * *', () => this.syncImap());
    this.logger.log('Reminder scheduler started (every 5 minutes)');
    this.logger.log('IMAP sync scheduler started (every 10 minutes)');
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
