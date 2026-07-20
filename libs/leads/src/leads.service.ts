import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService, RealtimeGateway } from '@crm/shared';
import { WebhooksService } from '@crm/webhooks';
import { AutomationService } from '@crm/automation';
import { AuditService } from '@crm/audit';
import { TagsService } from '@crm/tags';
import { Currency } from '@prisma/client';
import { CreateLeadDto, UpdateLeadDto, QueryLeadDto } from './dto/create-lead.dto';

const VALID_CURRENCIES = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];

function omitPortalPassword<T extends { portalPassword?: string | null }>(lead: T): Omit<T, 'portalPassword'> {
  const { portalPassword, ...rest } = lead;
  return rest;
}

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly webhooks: WebhooksService,
    private readonly realtime: RealtimeGateway,
    private readonly automation: AutomationService,
    private readonly audit: AuditService,
    private readonly tags: TagsService,
  ) {}

  private async checkStageQuota(tenantId: string, stageName: string) {
    const stage = await this.prisma.pipelineStage.findFirst({ where: { tenantId, name: stageName } });
    if (!stage?.maxLeads) return;
    const count = await this.prisma.lead.count({ where: { tenantId, status: stageName } });
    if (count >= stage.maxLeads) {
      throw new BadRequestException(`La etapa "${stageName}" alcanzó su cupo máximo de ${stage.maxLeads} leads.`);
    }
  }

  private async validateSubPhase(tenantId: string, stageName: string, subPhaseId: string) {
    const subPhase = await this.prisma.pipelineSubPhase.findFirst({
      where: { id: subPhaseId, tenantId },
      include: { pipelineStage: true },
    });
    if (!subPhase || subPhase.pipelineStage.name !== stageName) {
      throw new BadRequestException('La sub-fase no pertenece a la etapa seleccionada.');
    }
  }

  async create(dto: CreateLeadDto, ownerId: string, tenantId: string) {
    const currency = dto.currency ?? 'MXN';
    if (!VALID_CURRENCIES.includes(currency)) {
      throw new BadRequestException(`Invalid currency: ${currency}`);
    }

    let status = dto.status;
    if (!status) {
      const firstStage = await this.prisma.pipelineStage.findFirst({
        where: { tenantId },
        orderBy: { order: 'asc' },
      });
      status = firstStage?.name ?? 'new';
    }
    await this.checkStageQuota(tenantId, status);
    if (dto.subPhaseId) {
      await this.validateSubPhase(tenantId, status, dto.subPhaseId);
    }

    const lead = await this.prisma.$transaction(async (tx) => {
      const created = await tx.lead.create({
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          company: dto.company,
          source: dto.source || 'web',
          status,
          score: dto.score ?? 0,
          notes: dto.notes,
          value: dto.value ?? 0,
          currency: currency as Currency,
          expectedCloseDate: dto.expectedCloseDate ? new Date(dto.expectedCloseDate) : undefined,
          customFields: dto.customFields,
          campaignId: dto.campaignId,
          companyId: dto.companyId,
          companyName: dto.companyName,
          position: dto.position,
          customerStatus: dto.customerStatus as any,
          utmSource: dto.utmSource,
          utmMedium: dto.utmMedium,
          utmCampaign: dto.utmCampaign,
          utmTerm: dto.utmTerm,
          utmContent: dto.utmContent,
          careerId: dto.careerId,
          modalityId: dto.modalityId,
          subPhaseId: dto.subPhaseId,
          referredByLeadId: dto.referredByLeadId,
          ownerId,
          tenantId,
        },
      });
      await tx.leadStageHistory.create({
        data: { leadId: created.id, tenantId, fromStage: null, toStage: status, enteredAt: created.createdAt },
      });
      return created;
    });
    await this.audit.log({
      entity: 'lead', entityId: lead.id, action: 'created',
      changes: { name: dto.name, value: dto.value, status }, userId: ownerId, tenantId,
    });
    await this.automation.evaluate('lead.created', { ...lead, entity: 'lead', entityId: lead.id }, tenantId);
    await this.webhooks.emit('lead.created', lead, tenantId);
    return omitPortalPassword(lead);
  }

  async findAll(query: QueryLeadDto, user: any) {
    const tenantId = user.tenantId;
    const { search, status, source, campaignId, companyId, customerStatus, careerId, modalityId, tagId, page = 1, limit = 20 } = query;
    const where: any = { tenantId };
    if (user.role === 'seller') {
      where.ownerId = user.id;
    }
    if (status) where.status = status;
    if (source) where.source = source;
    if (campaignId) where.campaignId = campaignId;
    if (companyId) where.companyId = companyId;
    if (customerStatus) where.customerStatus = customerStatus;
    if (careerId) where.careerId = careerId;
    if (modalityId) where.modalityId = modalityId;
    if (tagId) {
      const entityIds = await this.tags.entityIdsForTag('lead', tagId, tenantId);
      where.id = { in: entityIds };
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        include: { owner: { select: { id: true, name: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.lead.count({ where }),
    ]);
    return { data: data.map(omitPortalPassword), total, page, limit };
  }

  async getPipeline(user: any) {
    const tenantId = user.tenantId;
    const [stages, leads] = await Promise.all([
      this.prisma.pipelineStage.findMany({
        where: { tenantId },
        orderBy: { order: 'asc' },
      }),
      this.prisma.lead.findMany({
        where: { tenantId, ...(user.role === 'seller' ? { ownerId: user.id } : {}) },
        include: {
          owner: { select: { id: true, name: true } },
          subPhase: { select: { id: true, name: true } },
        },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    const safeLeads = leads.map(omitPortalPassword);
    const stagesWithLeads = stages.map((stage) => ({
      ...stage,
      leads: safeLeads.filter((l) => l.status === stage.name),
    }));

    return { stages: stagesWithLeads };
  }

  async findById(id: string, user: any) {
    const tenantId = user.tenantId;
    const lead = await this.prisma.lead.findFirst({
      where: { id, tenantId, ...(user.role === 'seller' ? { ownerId: user.id } : {}) },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        account: { select: { id: true, name: true } },
        campaign: { select: { id: true, name: true, channel: true } },
        career: { select: { id: true, name: true } },
        modality: { select: { id: true, name: true } },
        subPhase: { select: { id: true, name: true } },
        activities: { orderBy: { createdAt: 'desc' }, take: 10 },
        referredByLead: { select: { id: true, name: true } },
      },
    });
    if (!lead) throw new NotFoundException('Lead not found');
    return omitPortalPassword(lead);
  }

  async update(id: string, dto: UpdateLeadDto, user: any) {
    const tenantId = user.tenantId;
    const existing = await this.findById(id, user);

    const data: any = {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      company: dto.company,
      source: dto.source,
      status: dto.status,
      score: dto.score,
      notes: dto.notes,
      value: dto.value,
      campaignId: dto.campaignId,
      companyId: dto.companyId,
      companyName: dto.companyName,
      position: dto.position,
      customerStatus: dto.customerStatus,
      customFields: dto.customFields,
      utmSource: dto.utmSource,
      utmMedium: dto.utmMedium,
      utmCampaign: dto.utmCampaign,
      utmTerm: dto.utmTerm,
      utmContent: dto.utmContent,
      careerId: dto.careerId,
      modalityId: dto.modalityId,
      subPhaseId: dto.subPhaseId,
      referredByLeadId: dto.referredByLeadId,
      isPartner: dto.isPartner,
    };
    if (dto.currency !== undefined) {
      if (!VALID_CURRENCIES.includes(dto.currency)) {
        throw new BadRequestException(`Invalid currency: ${dto.currency}`);
      }
      data.currency = dto.currency as Currency;
    }
    if (dto.expectedCloseDate) data.expectedCloseDate = new Date(dto.expectedCloseDate);
    Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

    if (dto.status !== undefined && dto.status !== existing.status) {
      await this.checkStageQuota(tenantId, dto.status);
      if (dto.subPhaseId) {
        await this.validateSubPhase(tenantId, dto.status, dto.subPhaseId);
      } else if (dto.subPhaseId === undefined) {
        data.subPhaseId = null;
      }
    } else if (dto.subPhaseId) {
      await this.validateSubPhase(tenantId, dto.status ?? existing.status, dto.subPhaseId);
    }

    const updated = await this.prisma.lead.update({ where: { id }, data });
    await this.automation.evaluate('lead.updated', { ...updated, entity: 'lead', entityId: id }, tenantId);
    await this.webhooks.emit('lead.updated', updated, tenantId);

    if (dto.status !== undefined) {
      if (dto.status !== existing.status) {
        await this.prisma.$transaction([
          this.prisma.leadStageHistory.updateMany({
            where: { leadId: id, exitedAt: null },
            data: { exitedAt: updated.updatedAt },
          }),
          this.prisma.leadStageHistory.create({
            data: { leadId: id, tenantId, fromStage: existing.status, toStage: dto.status, enteredAt: updated.updatedAt },
          }),
        ]);
      }
      await this.audit.log({
        entity: 'lead', entityId: id, action: 'status_changed',
        changes: { status: dto.status }, userId: updated.ownerId, tenantId,
      });
      await this.automation.evaluate('lead.stage_changed', { ...updated, entity: 'lead', entityId: id }, tenantId);
      await this.webhooks.emit('lead.stage_changed', { ...updated, entity: 'lead', entityId: id }, tenantId);
      this.realtime.broadcastToTenant(tenantId, 'lead:updated', omitPortalPassword(updated));
    }

    return omitPortalPassword(updated);
  }

  async remove(id: string, user: any) {
    const tenantId = user.tenantId;
    await this.findById(id, user);
    return this.prisma.lead.delete({ where: { id } });
  }

  async recalculateScore(id: string, user: any) {
    const tenantId = user.tenantId;
    const lead = await this.findById(id, user);
    let score = 0;
    if (lead.email) score += 10;
    if (lead.phone) score += 10;
    if (lead.company) score += 15;
    if (lead.source === 'referral') score += 20;
    if (lead.source === 'organic') score += 10;

    const updated = await this.prisma.lead.update({ where: { id }, data: { score } });
    return omitPortalPassword(updated);
  }

  private async computeHealth(leadId: string, tenantId: string): Promise<{ score: number | null; status: string }> {
    const contracts = await this.prisma.contract.findMany({
      where: { leadId, tenantId },
      include: { subscription: { include: { invoices: true } } },
    });

    if (contracts.length === 0) {
      return { score: null, status: 'unknown' };
    }

    const lastActivity = await this.prisma.activity.findFirst({
      where: { leadId, tenantId },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    });

    const openTickets = await this.prisma.ticket.findMany({
      where: { leadId, tenantId, status: { in: ['open', 'in_progress'] } },
      select: { priority: true },
    });

    let score = 100;

    if (!lastActivity) {
      score -= 30;
    } else {
      const daysSinceActivity = Math.floor((Date.now() - lastActivity.createdAt.getTime()) / (24 * 3600000));
      if (daysSinceActivity > 30) score -= 25;
      else if (daysSinceActivity >= 15) score -= 10;
    }

    const ticketPenaltyWeights: Record<string, number> = { critical: 15, high: 8, medium: 4, low: 2 };
    const ticketPenalty = Math.min(
      openTickets.reduce((sum, t) => sum + (ticketPenaltyWeights[t.priority] ?? 0), 0),
      35,
    );
    score -= ticketPenalty;

    const subscriptions = contracts.map((c) => c.subscription).filter((s): s is NonNullable<typeof s> => !!s);
    const hasCancelledSubscription = subscriptions.some((s) => s.status === 'cancelled');
    if (hasCancelledSubscription) {
      score -= 40;
    } else {
      const overdueCount = subscriptions.reduce(
        (sum, s) => sum + s.invoices.filter((i) => i.status === 'overdue').length,
        0,
      );
      score -= Math.min(overdueCount * 15, 30);

      const hasRecentPayment = subscriptions.some(
        (s) =>
          s.status === 'active' &&
          s.invoices.every((i) => i.status !== 'overdue') &&
          s.invoices.some((i) => i.status === 'paid' && i.paidAt && Date.now() - i.paidAt.getTime() <= 35 * 24 * 3600000),
      );
      if (overdueCount === 0 && hasRecentPayment) score += 5;

      const hasUpcomingRenewal = subscriptions.some(
        (s) =>
          s.status === 'active' &&
          s.nextBillingDate &&
          s.nextBillingDate.getTime() - Date.now() <= 14 * 24 * 3600000 &&
          s.nextBillingDate.getTime() >= Date.now(),
      );
      if (hasUpcomingRenewal) score -= 10;
    }

    score = Math.max(0, Math.min(100, score));
    const status = score >= 70 ? 'healthy' : score >= 40 ? 'at_risk' : 'critical';

    return { score, status };
  }

  async recalculateHealth(id: string, user: any) {
    const tenantId = user.tenantId;
    await this.findById(id, user);

    const { score, status } = await this.computeHealth(id, tenantId);
    const updated = await this.prisma.lead.update({
      where: { id },
      data: { healthScore: score, healthStatus: status as any },
    });
    return omitPortalPassword(updated);
  }

  async recalculateAllForTenant(tenantId: string) {
    const contracts = await this.prisma.contract.findMany({
      where: { tenantId },
      select: { leadId: true },
      distinct: ['leadId'],
    });

    let updated = 0;
    for (const { leadId } of contracts) {
      const { score, status } = await this.computeHealth(leadId, tenantId);
      await this.prisma.lead.update({
        where: { id: leadId },
        data: { healthScore: score, healthStatus: status as any },
      });
      updated++;
    }
    return { updated };
  }

  async findDuplicates(tenantId: string) {
    const leads = await this.prisma.lead.findMany({
      where: { tenantId },
      select: {
        id: true, name: true, email: true, phone: true, company: true, companyName: true,
        status: true, value: true, ownerId: true, createdAt: true,
        owner: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    const groupsByKey = new Map<string, typeof leads>();
    for (const lead of leads) {
      if (lead.email) {
        const key = `email:${lead.email.trim().toLowerCase()}`;
        groupsByKey.set(key, [...(groupsByKey.get(key) || []), lead]);
      }
      if (lead.phone) {
        const digits = lead.phone.replace(/\D/g, '');
        if (digits.length >= 7) {
          const key = `phone:${digits}`;
          groupsByKey.set(key, [...(groupsByKey.get(key) || []), lead]);
        }
      }
    }

    const seen = new Set<string>();
    const groups: { matchedBy: 'email' | 'phone'; leads: typeof leads }[] = [];
    for (const [key, group] of groupsByKey) {
      if (group.length < 2) continue;
      const dedupeKey = group.map((l) => l.id).sort().join(',');
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      groups.push({ matchedBy: key.startsWith('email:') ? 'email' : 'phone', leads: group });
    }

    return groups;
  }

  async merge(primaryId: string, duplicateIds: string[], userId: string, tenantId: string) {
    const ids = duplicateIds.filter((id) => id !== primaryId);
    if (ids.length === 0) throw new BadRequestException('No hay duplicados para fusionar');

    const primary = await this.prisma.lead.findFirst({ where: { id: primaryId, tenantId } });
    if (!primary) throw new NotFoundException('Lead principal no encontrado');

    const duplicates = await this.prisma.lead.findMany({ where: { id: { in: ids }, tenantId } });
    if (duplicates.length !== ids.length) throw new NotFoundException('Algún lead duplicado no existe');

    await this.prisma.$transaction(async (tx) => {
      for (const dup of duplicates) {
        await tx.activity.updateMany({ where: { leadId: dup.id }, data: { leadId: primaryId } });
        await tx.quote.updateMany({ where: { leadId: dup.id }, data: { leadId: primaryId } });
        await tx.ticket.updateMany({ where: { leadId: dup.id }, data: { leadId: primaryId } });
        await tx.email.updateMany({ where: { leadId: dup.id }, data: { leadId: primaryId } });

        const recipients = await tx.campaignRecipient.findMany({ where: { leadId: dup.id } });
        for (const recipient of recipients) {
          const existing = await tx.campaignRecipient.findFirst({
            where: { campaignId: recipient.campaignId, leadId: primaryId },
          });
          if (existing) {
            await tx.campaignRecipient.delete({ where: { id: recipient.id } });
          } else {
            await tx.campaignRecipient.update({ where: { id: recipient.id }, data: { leadId: primaryId } });
          }
        }

        await tx.note.updateMany({ where: { relatedType: 'lead', relatedId: dup.id }, data: { relatedId: primaryId } });
        await tx.fileAttachment.updateMany({ where: { entity: 'lead', entityId: dup.id }, data: { entityId: primaryId } });
        await tx.auditLog.updateMany({ where: { entity: 'lead', entityId: dup.id }, data: { entityId: primaryId } });
        await tx.aiSuggestion.updateMany({ where: { entity: 'lead', entityId: dup.id }, data: { entityId: primaryId } });
        await tx.task.updateMany({ where: { relatedType: 'lead', relatedId: dup.id }, data: { relatedId: primaryId } });

        await tx.lead.delete({ where: { id: dup.id } });
      }

      const fill: any = {};
      for (const field of ['email', 'phone', 'company', 'companyName', 'position', 'customerStatus', 'companyId', 'campaignId'] as const) {
        if (!primary[field]) {
          const fromDup = duplicates.find((d) => d[field]);
          if (fromDup) fill[field] = fromDup[field];
        }
      }
      if (Object.keys(fill).length > 0) {
        await tx.lead.update({ where: { id: primaryId }, data: fill });
      }
    });

    await this.audit.log({
      entity: 'lead', entityId: primaryId, action: 'merged',
      changes: { mergedIds: ids }, userId, tenantId,
    });

    return this.findById(primaryId, tenantId);
  }
}
