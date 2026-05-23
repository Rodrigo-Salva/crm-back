import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { Currency } from '@prisma/client';
import { AutomationService } from '@crm/automation';
import { AuditService } from '@crm/audit';
import { WebhooksService } from '@crm/webhooks';
import { RealtimeGateway } from '@crm/shared';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { QueryDealDto } from './dto/query-deal.dto';

@Injectable()
export class DealsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly automation: AutomationService,
    private readonly audit: AuditService,
    private readonly webhooks: WebhooksService,
    private readonly realtime: RealtimeGateway,
  ) {}

  async create(dto: CreateDealDto, ownerId: string, tenantId: string) {
    // Validate currency is a valid enum value
    const currency = dto.currency ?? 'MXN';
    const validCurrencies = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];
    if (!validCurrencies.includes(currency)) {
      throw new BadRequestException(`Invalid currency: ${currency}`);
    }
    
    const deal = await this.prisma.deal.create({
      data: {
        title: dto.title,
        value: dto.value ?? 0,
        currency: currency as Currency,
        stage: dto.stage ?? 'lead',
        contactId: dto.contactId,
        ownerId,
        tenantId,
        expectedCloseDate: dto.expectedCloseDate ? new Date(dto.expectedCloseDate) : undefined,
        customFields: dto.customFields,
        convertedFromLead: dto.convertedFromLead ?? false,
        convertedFromId: dto.convertedFromId,
      },
      include: { contact: { select: { id: true, name: true, email: true } } },
    });

    await this.audit.log({
      entity: 'deal', entityId: deal.id, action: 'created',
      changes: { title: dto.title, value: dto.value, stage: dto.stage },
      userId: ownerId, tenantId,
    });

    await this.automation.evaluate('deal.created', { ...deal, entity: 'deal', entityId: deal.id }, tenantId);
    await this.webhooks.emit('deal.created', { ...deal, entity: 'deal', entityId: deal.id }, tenantId);

    return deal;
  }

  async findAll(query: QueryDealDto, tenantId: string) {
    const { search, stage, page = 1, limit = 20 } = query;
    const where: any = { tenantId };

    if (stage) where.stage = stage;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { contact: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.deal.findMany({
        where,
        include: {
          contact: { select: { id: true, name: true, email: true } },
          owner: { select: { id: true, name: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.deal.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async getPipeline(tenantId: string) {
    const [stages, deals] = await Promise.all([
      this.prisma.pipelineStage.findMany({
        where: { tenantId },
        orderBy: { order: 'asc' },
      }),
      this.prisma.deal.findMany({
        where: { tenantId },
        include: {
          contact: { select: { id: true, name: true, email: true } },
          owner: { select: { id: true, name: true } },
        },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    const stagesWithDeals = stages.map((stage) => ({
      ...stage,
      deals: deals.filter((d) => d.stage === stage.name),
    }));

    return { stages: stagesWithDeals };
  }

  async findById(id: string, tenantId: string) {
    const deal = await this.prisma.deal.findFirst({
      where: { id, tenantId },
      include: {
        contact: { select: { id: true, name: true, email: true, phone: true } },
        owner: { select: { id: true, name: true, email: true } },
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
    if (!deal) throw new NotFoundException('Deal not found');
    return deal;
  }

  async update(id: string, dto: UpdateDealDto, tenantId: string) {
    await this.findById(id, tenantId);
    const data: any = { ...dto };
    // Validate currency if provided
    if (dto.currency !== undefined) {
      const validCurrencies = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];
      if (!validCurrencies.includes(dto.currency)) {
        throw new BadRequestException(`Invalid currency: ${dto.currency}`);
      }
      data.currency = dto.currency as Currency;
    }
    if (dto.expectedCloseDate) data.expectedCloseDate = new Date(dto.expectedCloseDate);
    const updated = await this.prisma.deal.update({ where: { id }, data });

    await this.audit.log({
      entity: 'deal', entityId: id, action: 'updated',
      changes: dto, userId: updated.ownerId, tenantId,
    });
    await this.webhooks.emit('deal.updated', { ...updated, entity: 'deal', entityId: id }, tenantId);

    return updated;
  }

  async updateStage(id: string, stage: string, tenantId: string) {
    await this.findById(id, tenantId);
    const updated = await this.prisma.deal.update({ where: { id }, data: { stage } });

    await this.audit.log({
      entity: 'deal', entityId: id, action: 'stage_changed',
      changes: { stage }, userId: updated.ownerId, tenantId,
    });

    await this.automation.evaluate('deal.stage_changed', { ...updated, entity: 'deal', entityId: id }, tenantId);
    await this.webhooks.emit('deal.stage_changed', { ...updated, entity: 'deal', entityId: id }, tenantId);
    
    // Broadcast websocket event
    this.realtime.broadcastToTenant(tenantId, 'deal:updated', updated);

    return updated;
  }

  async convertFromLead(id: string, dto: any, tenantId: string) {
    const deal = await this.findById(id, tenantId);
    if (deal.convertedFromLead) throw new BadRequestException('Already converted');

    if (dto.contactStatus) {
      await this.prisma.contact.update({
        where: { id: deal.contactId },
        data: { status: dto.contactStatus },
      });
    }

    return this.prisma.deal.update({
      where: { id },
      data: {
        convertedFromLead: true,
        stage: dto.stage || 'qualified',
        value: dto.value ?? deal.value,
      },
    });
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.deal.delete({ where: { id } });
  }
}
