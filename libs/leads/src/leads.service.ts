import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { WebhooksService } from '@crm/webhooks';
import { CreateLeadDto, UpdateLeadDto, QueryLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly webhooks: WebhooksService,
  ) {}

  async create(dto: CreateLeadDto, ownerId: string, tenantId: string) {
    const lead = await this.prisma.lead.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        company: dto.company,
        source: dto.source || 'web',
        status: dto.status || 'new',
        score: dto.score ?? 0,
        notes: dto.notes,
        ownerId,
        tenantId,
      },
    });
    await this.webhooks.emit('lead.created', lead, tenantId);
    return lead;
  }

  async findAll(query: QueryLeadDto, tenantId: string) {
    const { search, status, source, page = 1, limit = 20 } = query;
    const where: any = { tenantId };
    if (status) where.status = status;
    if (source) where.source = source;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
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
    return { data, total, page, limit };
  }

  async findById(id: string, tenantId: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, tenantId },
      include: { owner: { select: { id: true, name: true, email: true } } },
    });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async update(id: string, dto: UpdateLeadDto, tenantId: string) {
    await this.findById(id, tenantId);
    const updated = await this.prisma.lead.update({ where: { id }, data: dto });
    await this.webhooks.emit('lead.updated', updated, tenantId);
    return updated;
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.lead.delete({ where: { id } });
  }

  async convert(id: string, contactId: string, dealTitle?: string, userId?: string, tenantId?: string) {
    const lead = await this.findById(id, tenantId!);
    const deal = dealTitle
      ? await this.prisma.deal.create({
          data: {
            title: dealTitle,
            contactId,
            ownerId: userId || lead.ownerId,
            tenantId: tenantId!,
            stage: 'lead',
            convertedFromLead: true,
            convertedFromId: id,
          },
        })
      : null;

    await this.prisma.lead.update({
      where: { id },
      data: {
        status: 'converted',
        convertedContactId: contactId,
        convertedDealId: deal?.id || null,
      },
    });

    return { lead: { ...lead, status: 'converted', convertedContactId: contactId, convertedDealId: deal?.id }, deal };
  }

  async recalculateScore(id: string, tenantId: string) {
    const lead = await this.findById(id, tenantId);
    let score = 0;
    if (lead.email) score += 10;
    if (lead.phone) score += 10;
    if (lead.company) score += 15;
    if (lead.source === 'referral') score += 20;
    if (lead.source === 'organic') score += 10;

    const updated = await this.prisma.lead.update({ where: { id }, data: { score } });
    return updated;
  }
}
