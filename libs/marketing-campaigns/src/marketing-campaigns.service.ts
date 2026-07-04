import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreateMarketingCampaignDto, UpdateMarketingCampaignDto } from './dto/create-marketing-campaign.dto';

@Injectable()
export class MarketingCampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMarketingCampaignDto, tenantId: string) {
    return this.prisma.marketingCampaign.create({
      data: {
        name: dto.name,
        channel: dto.channel,
        budget: dto.budget ?? 0,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        notes: dto.notes,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    const campaigns = await this.prisma.marketingCampaign.findMany({
      where: { tenantId },
      include: { _count: { select: { leads: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return campaigns;
  }

  async findById(id: string, tenantId: string) {
    const campaign = await this.prisma.marketingCampaign.findFirst({
      where: { id, tenantId },
      include: { leads: { select: { id: true, name: true, status: true, value: true, currency: true } } },
    });
    if (!campaign) throw new NotFoundException('Marketing campaign not found');
    return campaign;
  }

  async update(id: string, dto: UpdateMarketingCampaignDto, tenantId: string) {
    await this.findById(id, tenantId);
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.prisma.marketingCampaign.update({ where: { id }, data });
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    await this.prisma.lead.updateMany({ where: { campaignId: id }, data: { campaignId: null } });
    return this.prisma.marketingCampaign.delete({ where: { id } });
  }

  async getStats(id: string, tenantId: string) {
    const campaign = await this.findById(id, tenantId);
    const wonStages = await this.prisma.pipelineStage.findMany({
      where: { tenantId, isWon: true },
      select: { name: true },
    });
    const wonNames = wonStages.map((s) => s.name);

    const wonLeads = campaign.leads.filter((l) => wonNames.includes(l.status));
    const totalValue = wonLeads.reduce((sum, l) => sum + l.value, 0);
    const budget = campaign.budget ?? 0;
    const roi = budget > 0 ? ((totalValue - budget) / budget) * 100 : null;

    return {
      leadsCount: campaign.leads.length,
      wonCount: wonLeads.length,
      totalValueWon: totalValue,
      budget,
      roi,
    };
  }
}
