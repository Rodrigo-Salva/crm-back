import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { AutomationService } from '@crm/automation';
import { AuditService } from '@crm/audit';
import { WebhooksService } from '@crm/webhooks';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly automation: AutomationService,
    private readonly audit: AuditService,
    private readonly webhooks: WebhooksService,
  ) {}

  async create(dto: any, userId: string, tenantId: string) {
    const slaHours: Record<string, number> = { low: 72, medium: 48, high: 24, critical: 8 };
    const slaDeadline = new Date();
    slaDeadline.setHours(slaDeadline.getHours() + (slaHours[dto.priority || 'medium'] || 48));

    const ticket = await this.prisma.ticket.create({
      data: {
        subject: dto.subject,
        description: dto.description,
        priority: dto.priority || 'medium',
        contactId: dto.contactId,
        assignedTo: dto.assignedTo,
        tenantId,
        slaDeadline,
      },
      include: { contact: { select: { id: true, name: true, email: true } } },
    });

    await this.audit.log({
      entity: 'ticket', entityId: ticket.id, action: 'created',
      changes: { subject: dto.subject, priority: dto.priority, contactId: dto.contactId },
      userId, tenantId,
    });
    await this.automation.evaluate('ticket.created', { ...ticket, entity: 'ticket', entityId: ticket.id }, tenantId);
    await this.webhooks.emit('ticket.created', { ...ticket, entity: 'ticket', entityId: ticket.id }, tenantId);

    return ticket;
  }

  async findAll(tenantId: string, status?: string, contactId?: string) {
    const where: any = { tenantId };
    if (status) where.status = status;
    if (contactId) where.contactId = contactId;
    return this.prisma.ticket.findMany({
      where,
      include: {
        contact: { select: { id: true, name: true, email: true } },
        assignee: { select: { id: true, name: true } },
        _count: { select: { messages: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string, contactId?: string) {
    const where: any = { id, tenantId };
    if (contactId) where.contactId = contactId;
    const ticket = await this.prisma.ticket.findFirst({
      where,
      include: {
        contact: { select: { id: true, name: true, email: true, portalPassword: true } },
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
      changes: dto, userId: before.assignedTo || before.contactId || '', tenantId,
    });
    await this.automation.evaluate('ticket.updated', { ...updated, entity: 'ticket', entityId: id }, tenantId);
    await this.webhooks.emit('ticket.updated', { ...updated, entity: 'ticket', entityId: id }, tenantId);

    return updated;
  }

  async addMessage(ticketId: string, dto: { content: string; isInternal?: boolean }, userId: string | null, tenantId: string) {
    await this.findById(ticketId, tenantId);
    return this.prisma.ticketMessage.create({
      data: {
        ticketId,
        authorId: userId,
        content: dto.content,
        isInternal: dto.isInternal || false,
      },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async getSlaStatus(tenantId: string) {
    const now = new Date();
    const tickets = await this.prisma.ticket.findMany({
      where: { tenantId, status: { notIn: ['resolved', 'closed'] } },
      select: { id: true, number: true, subject: true, priority: true, slaDeadline: true, status: true },
    });

    return tickets.map((t) => ({
      ...t,
      slaBreached: t.slaDeadline ? t.slaDeadline < now : false,
      slaRemainingHours: t.slaDeadline ? Math.round((t.slaDeadline.getTime() - now.getTime()) / 3600000) : null,
    }));
  }

  async createFromEmail(from: string, subject: string, body: string, tenantId: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { tenantId, email: { equals: from, mode: 'insensitive' } },
    });

    const ticket = await this.create(
      { subject: `[Email] ${subject}`, description: body.substring(0, 2000), contactId: contact?.id },
      contact?.ownerId || '',
      tenantId,
    );

    this.logger.log(`Ticket #${ticket.number} created from email: ${subject}`);
    return ticket;
  }
}
