import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService, RealtimeGateway } from '@crm/shared';
import { AutomationService } from '@crm/automation';
import { AuditService } from '@crm/audit';
import { WebhooksService } from '@crm/webhooks';
import { NotificationsService } from '@crm/notifications';
import { TagsService } from '@crm/tags';
import { NpsService } from '@crm/nps';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly automation: AutomationService,
    private readonly audit: AuditService,
    private readonly webhooks: WebhooksService,
    private readonly notifications: NotificationsService,
    private readonly realtime: RealtimeGateway,
    private readonly tags: TagsService,
    private readonly nps: NpsService,
  ) {}

  private async notifyAssignee(assignedTo: string, title: string, body: string, link: string) {
    const notification = await this.notifications.create({ userId: assignedTo, title, body, link });
    this.realtime.notifyUser(assignedTo, 'notification:new', notification);
  }

  private static readonly DEFAULT_SLA_POLICY: Record<string, { responseHours: number; resolutionHours: number }> = {
    low: { responseHours: 24, resolutionHours: 72 },
    medium: { responseHours: 8, resolutionHours: 48 },
    high: { responseHours: 4, resolutionHours: 24 },
    critical: { responseHours: 1, resolutionHours: 8 },
  };

  async getSlaPolicy(tenantId: string) {
    const setting = await this.prisma.tenantSetting.findUnique({
      where: { key_tenantId: { key: 'slaPolicy', tenantId } },
    });
    let stored: Record<string, { responseHours: number; resolutionHours: number }> = {};
    if (setting) {
      try {
        stored = JSON.parse(setting.value);
      } catch {
        stored = {};
      }
    }
    const merged: Record<string, { responseHours: number; resolutionHours: number }> = {};
    for (const priority of Object.keys(TicketsService.DEFAULT_SLA_POLICY)) {
      merged[priority] = { ...TicketsService.DEFAULT_SLA_POLICY[priority], ...(stored[priority] || {}) };
    }
    return merged;
  }

  async setSlaPolicy(tenantId: string, policy: Record<string, { responseHours: number; resolutionHours: number }>) {
    await this.prisma.tenantSetting.upsert({
      where: { key_tenantId: { key: 'slaPolicy', tenantId } },
      create: { key: 'slaPolicy', value: JSON.stringify(policy), tenantId },
      update: { value: JSON.stringify(policy) },
    });
    return this.getSlaPolicy(tenantId);
  }

  async create(dto: any, userId: string, tenantId: string) {
    const priority = dto.priority || 'medium';
    const policy = await this.getSlaPolicy(tenantId);
    const { responseHours, resolutionHours } = policy[priority] || TicketsService.DEFAULT_SLA_POLICY.medium;
    const slaDeadline = new Date();
    slaDeadline.setHours(slaDeadline.getHours() + resolutionHours);
    const firstResponseDeadline = new Date();
    firstResponseDeadline.setHours(firstResponseDeadline.getHours() + responseHours);

    const ticket = await this.prisma.ticket.create({
      data: {
        subject: dto.subject,
        description: dto.description,
        priority,
        leadId: dto.leadId,
        assignedTo: dto.assignedTo,
        tenantId,
        slaDeadline,
        firstResponseDeadline,
      },
      include: { lead: { select: { id: true, name: true, email: true } } },
    });

    await this.audit.log({
      entity: 'ticket', entityId: ticket.id, action: 'created',
      changes: { subject: dto.subject, priority: dto.priority, leadId: dto.leadId },
      userId, tenantId,
    });
    await this.automation.evaluate('ticket.created', { ...ticket, entity: 'ticket', entityId: ticket.id }, tenantId);
    await this.webhooks.emit('ticket.created', { ...ticket, entity: 'ticket', entityId: ticket.id }, tenantId);

    if (ticket.assignedTo && ticket.assignedTo !== userId) {
      await this.notifyAssignee(
        ticket.assignedTo,
        'Nuevo ticket asignado',
        ticket.subject,
        `/tickets/${ticket.id}`,
      );
    }

    return ticket;
  }

  async findAll(tenantId: string, status?: string, leadId?: string, tagId?: string) {
    const where: any = { tenantId };
    if (status) where.status = status;
    if (leadId) where.leadId = leadId;
    if (tagId) {
      const entityIds = await this.tags.entityIdsForTag('ticket', tagId, tenantId);
      where.id = { in: entityIds };
    }
    return this.prisma.ticket.findMany({
      where,
      include: {
        lead: { select: { id: true, name: true, email: true } },
        assignee: { select: { id: true, name: true } },
        _count: { select: { messages: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string, leadId?: string) {
    const where: any = { id, tenantId };
    if (leadId) where.leadId = leadId;
    const ticket = await this.prisma.ticket.findFirst({
      where,
      include: {
        lead: { select: { id: true, name: true, email: true } },
        assignee: { select: { id: true, name: true, email: true } },
        messages: {
          include: { author: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async update(id: string, dto: any, tenantId: string) {
    const before = await this.findById(id, tenantId);
    const updated = await this.prisma.ticket.update({ where: { id }, data: dto });

    await this.audit.log({
      entity: 'ticket', entityId: id, action: 'updated',
      changes: dto, userId: before.assignedTo || before.leadId || '', tenantId,
    });
    await this.automation.evaluate('ticket.updated', { ...updated, entity: 'ticket', entityId: id }, tenantId);
    await this.webhooks.emit('ticket.updated', { ...updated, entity: 'ticket', entityId: id }, tenantId);

    if (dto.assignedTo && dto.assignedTo !== before.assignedTo) {
      await this.notifyAssignee(
        dto.assignedTo,
        'Ticket asignado',
        updated.subject,
        `/tickets/${updated.id}`,
      );
    }

    if (dto.status && ['resolved', 'closed'].includes(dto.status) && dto.status !== before.status) {
      try { await this.nps.createAndSendSurvey(id, tenantId); } catch {}
    }

    return updated;
  }

  async addMessage(ticketId: string, dto: { content: string; isInternal?: boolean }, userId: string | null, tenantId: string) {
    const ticket = await this.findById(ticketId, tenantId);
    const message = await this.prisma.ticketMessage.create({
      data: {
        ticketId,
        authorId: userId,
        content: dto.content,
        isInternal: dto.isInternal || false,
      },
      include: { author: { select: { id: true, name: true } } },
    });

    if (!dto.isInternal && userId && !ticket.firstRespondedAt) {
      await this.prisma.ticket.update({ where: { id: ticketId }, data: { firstRespondedAt: new Date() } });
    }

    return message;
  }

  async getSlaStatus(tenantId: string) {
    const now = new Date();
    const tickets = await this.prisma.ticket.findMany({
      where: { tenantId, status: { notIn: ['resolved', 'closed'] } },
      select: {
        id: true, number: true, subject: true, priority: true, status: true,
        slaDeadline: true, firstResponseDeadline: true, firstRespondedAt: true,
      },
    });

    return tickets.map((t) => ({
      ...t,
      slaBreached: t.slaDeadline ? t.slaDeadline < now : false,
      slaRemainingHours: t.slaDeadline ? Math.round((t.slaDeadline.getTime() - now.getTime()) / 3600000) : null,
      firstResponseBreached: t.firstResponseDeadline && !t.firstRespondedAt ? t.firstResponseDeadline < now : false,
      firstResponseRemainingHours: t.firstResponseDeadline && !t.firstRespondedAt
        ? Math.round((t.firstResponseDeadline.getTime() - now.getTime()) / 3600000)
        : null,
    }));
  }

  async createFromEmail(from: string, subject: string, body: string, tenantId: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { tenantId, email: { equals: from, mode: 'insensitive' } },
    });

    const ticket = await this.create(
      { subject: `[Email] ${subject}`, description: body.substring(0, 2000), leadId: lead?.id },
      lead?.ownerId || '',
      tenantId,
    );

    this.logger.log(`Ticket #${ticket.number} created from email: ${subject}`);
    return ticket;
  }
}
