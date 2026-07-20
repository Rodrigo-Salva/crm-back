import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { TenantSettingsService } from '@crm/tenant-settings';

const RATE_KEY = 'referral_reward_rate';

@Injectable()
export class ReferralsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantSettings: TenantSettingsService,
  ) {}

  async getRate(tenantId: string): Promise<number> {
    const settings = await this.tenantSettings.get(tenantId);
    return settings[RATE_KEY] ? parseFloat(settings[RATE_KEY]) : 0;
  }

  async setRate(rate: number, tenantId: string) {
    await this.tenantSettings.set(RATE_KEY, String(rate), tenantId);
    return { rate };
  }

  async calculateForQuote(quote: { id: string; leadId: string | null; grandTotal: number }, tenantId: string) {
    if (!quote.leadId) return null;

    const lead = await this.prisma.lead.findFirst({ where: { id: quote.leadId, tenantId } });
    if (!lead?.referredByLeadId) return null;

    const rate = await this.getRate(tenantId);
    const amount = (quote.grandTotal * rate) / 100;

    return this.prisma.referralReward.upsert({
      where: { quoteId: quote.id },
      create: {
        tenantId,
        referrerLeadId: lead.referredByLeadId,
        referredLeadId: lead.id,
        quoteId: quote.id,
        baseAmount: quote.grandTotal,
        rate,
        amount,
      },
      update: {
        baseAmount: quote.grandTotal,
        rate,
        amount,
      },
    });
  }

  async findAll(tenantId: string, filters: { referrerLeadId?: string; year?: number; month?: number; status?: string }) {
    const where: any = { tenantId };
    if (filters.referrerLeadId) where.referrerLeadId = filters.referrerLeadId;
    if (filters.status) where.status = filters.status;
    if (filters.year && filters.month) {
      where.createdAt = {
        gte: new Date(filters.year, filters.month - 1, 1),
        lt: new Date(filters.year, filters.month, 1),
      };
    }

    return this.prisma.referralReward.findMany({
      where,
      include: {
        referrerLead: { select: { id: true, name: true } },
        referredLead: { select: { id: true, name: true } },
        quote: { select: { id: true, number: true, grandTotal: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markPaid(id: string, tenantId: string) {
    const entry = await this.prisma.referralReward.findFirst({ where: { id, tenantId } });
    if (!entry) throw new NotFoundException('Recompensa no encontrada');
    return this.prisma.referralReward.update({
      where: { id },
      data: { status: 'paid', paidAt: new Date() },
    });
  }
}
