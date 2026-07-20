import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { TenantSettingsService } from '@crm/tenant-settings';

const DEFAULT_RATE_KEY = 'commission_default_rate';

@Injectable()
export class CommissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantSettings: TenantSettingsService,
  ) {}

  private async resolveRate(userId: string, tenantId: string): Promise<number> {
    const user = await this.prisma.user.findFirst({ where: { id: userId, tenantId } });
    if (user?.commissionRate != null) return user.commissionRate;

    const settings = await this.tenantSettings.get(tenantId);
    const defaultRate = settings[DEFAULT_RATE_KEY];
    return defaultRate ? parseFloat(defaultRate) : 0;
  }

  async calculateForQuote(quote: { id: string; createdById: string; grandTotal: number }, tenantId: string) {
    const rate = await this.resolveRate(quote.createdById, tenantId);
    const amount = (quote.grandTotal * rate) / 100;

    return this.prisma.commissionEntry.upsert({
      where: { quoteId: quote.id },
      create: {
        tenantId,
        userId: quote.createdById,
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

  async findAll(tenantId: string, filters: { userId?: string; year?: number; month?: number; status?: string }) {
    const where: any = { tenantId };
    if (filters.userId) where.userId = filters.userId;
    if (filters.status) where.status = filters.status;
    if (filters.year && filters.month) {
      where.createdAt = {
        gte: new Date(filters.year, filters.month - 1, 1),
        lt: new Date(filters.year, filters.month, 1),
      };
    }

    return this.prisma.commissionEntry.findMany({
      where,
      include: {
        user: { select: { id: true, name: true } },
        quote: { select: { id: true, number: true, grandTotal: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markPaid(id: string, tenantId: string) {
    const entry = await this.prisma.commissionEntry.findFirst({ where: { id, tenantId } });
    if (!entry) throw new NotFoundException('Comisión no encontrada');
    return this.prisma.commissionEntry.update({
      where: { id },
      data: { status: 'paid', paidAt: new Date() },
    });
  }

  async getRates(tenantId: string) {
    const [settings, users] = await Promise.all([
      this.tenantSettings.get(tenantId),
      this.prisma.user.findMany({
        where: { tenantId, role: { in: ['admin', 'seller'] } },
        select: { id: true, name: true, commissionRate: true },
        orderBy: { name: 'asc' },
      }),
    ]);

    const defaultRate = settings[DEFAULT_RATE_KEY] ? parseFloat(settings[DEFAULT_RATE_KEY]) : 0;
    return { defaultRate, users };
  }

  async setDefaultRate(rate: number, tenantId: string) {
    await this.tenantSettings.set(DEFAULT_RATE_KEY, String(rate), tenantId);
    return this.getRates(tenantId);
  }

  async setUserRate(userId: string, rate: number | null, tenantId: string) {
    const user = await this.prisma.user.findFirst({ where: { id: userId, tenantId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.prisma.user.update({
      where: { id: userId },
      data: { commissionRate: rate },
      select: { id: true, name: true, commissionRate: true },
    });
  }
}
