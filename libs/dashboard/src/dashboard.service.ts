import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getSummary(tenantId: string, from?: string, to?: string) {
    const dateFilter = from || to
      ? { createdAt: { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) } }
      : {};

    const [totalDeals, totalCompanies, totalActivities] = await Promise.all([
      this.prisma.lead.count({ where: { tenantId, ...dateFilter } }),
      this.prisma.company.count({ where: { tenantId, ...dateFilter } }),
      this.prisma.activity.count({ where: { tenantId, ...dateFilter } }),
    ]);

    const wonStages = await this.prisma.pipelineStage.findMany({
      where: { tenantId, isWon: true },
      select: { name: true },
    });

    const closedDeals = await this.prisma.lead.aggregate({
      where: { tenantId, status: { in: wonStages.map((s) => s.name) }, ...dateFilter },
      _sum: { value: true },
      _count: true,
    });

    return {
      totalDeals,
      totalCompanies,
      totalActivities,
      closedDealsValue: closedDeals._sum.value || 0,
      closedDealsCount: closedDeals._count,
    };
  }

  async getPipelineStages(tenantId: string) {
    const stages = await this.prisma.pipelineStage.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' },
    });

    const counts = await Promise.all(
      stages.map((stage) =>
        this.prisma.lead.count({ where: { tenantId, status: stage.name } }),
      ),
    );

    const total = counts.reduce((a, b) => a + b, 0);

    return stages.map((stage, i) => ({
      name: stage.name,
      color: stage.color,
      count: counts[i],
      percentage: total ? ((counts[i] / total) * 100).toFixed(1) : '0',
    }));
  }

  async getActivityBySeller(tenantId: string, from?: string, to?: string) {
    const dateFilter: any = { tenantId };
    if (from || to) {
      dateFilter.createdAt = {};
      if (from) dateFilter.createdAt.gte = new Date(from);
      if (to) dateFilter.createdAt.lte = new Date(to);
    }

    const users = await this.prisma.user.findMany({
      where: { tenantId, role: { not: 'superadmin' } },
      select: { id: true, name: true, email: true },
    });

    const activities = await this.prisma.activity.groupBy({
      by: ['ownerId', 'type'],
      where: dateFilter,
      _count: true,
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    const result: Record<string, any> = {};
    for (const act of activities) {
      const userId = act.ownerId;
      if (!result[userId]) {
        const user = userMap.get(userId);
        result[userId] = { id: userId, name: user?.name || 'Unknown', total: 0, byType: {} };
      }
      result[userId].byType[act.type] = act._count;
      result[userId].total += act._count;
    }

    return Object.values(result);
  }

  async getDealsByStage(tenantId: string) {
    const stages = await this.prisma.pipelineStage.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' },
    });

    const dealStageMap = new Map<string, { count: number; totalValue: number }>();

    for (const stage of stages) {
      const agg = await this.prisma.lead.aggregate({
        where: { tenantId, status: stage.name },
        _count: true,
        _sum: { value: true },
      });
      dealStageMap.set(stage.name, {
        count: agg._count,
        totalValue: agg._sum.value || 0,
      });
    }

    return stages.map((s) => ({
      name: s.name,
      color: s.color,
      ...dealStageMap.get(s.name),
    }));
  }

  async getMonthlyActivity(tenantId: string, months = 6) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const activities = await this.prisma.activity.findMany({
      where: { tenantId, createdAt: { gte: start, lte: end } },
      select: { createdAt: true, type: true },
    });

    const monthly: Record<string, { total: number; calls: number; emails: number; meetings: number; others: number }> = {};
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthly[key] = { total: 0, calls: 0, emails: 0, meetings: 0, others: 0 };
    }

    for (const act of activities) {
      const key = `${act.createdAt.getFullYear()}-${String(act.createdAt.getMonth() + 1).padStart(2, '0')}`;
      if (!monthly[key]) continue;
      monthly[key].total++;
      const type = act.type?.toLowerCase() || '';
      if (type.includes('call')) monthly[key].calls++;
      else if (type.includes('email')) monthly[key].emails++;
      else if (type.includes('meeting')) monthly[key].meetings++;
      else monthly[key].others++;
    }

    return Object.entries(monthly).map(([month, data]) => ({ month, ...data }));
  }

  async getForecast(tenantId: string, months = 3) {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + months, 1);

    const stages = await this.prisma.pipelineStage.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' },
    });

    const stageWeights: Record<string, number> = {};
    stages.forEach((s, i) => {
      stageWeights[s.name] = Math.min((i + 1) / stages.length, 1);
    });

    const leads = await this.prisma.lead.findMany({
      where: { tenantId, expectedCloseDate: { gte: now, lte: end } },
      select: { name: true, value: true, status: true, expectedCloseDate: true },
    });

    const monthly: Record<string, { total: number; weighted: number; deals: any[] }> = {};
    for (let i = 0; i < months; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthly[key] = { total: 0, weighted: 0, deals: [] };
    }

    for (const lead of leads) {
      if (!lead.expectedCloseDate) continue;
      const key = `${lead.expectedCloseDate.getFullYear()}-${String(lead.expectedCloseDate.getMonth() + 1).padStart(2, '0')}`;
      if (!monthly[key]) continue;
      monthly[key].total += lead.value;
      monthly[key].weighted += lead.value * (stageWeights[lead.status] || 0);
      monthly[key].deals.push({ title: lead.name, value: lead.value, stage: lead.status });
    }

    return Object.entries(monthly).map(([month, data]) => ({
      month,
      total: data.total,
      weighted: Math.round(data.weighted * 100) / 100,
      deals: data.deals.length,
    }));
  }

  private static readonly MONTHLY_FACTOR: Record<string, number> = {
    weekly: 52 / 12,
    monthly: 1,
    quarterly: 1 / 3,
    yearly: 1 / 12,
  };

  async getMrrArr(tenantId: string) {
    const subscriptions = await this.prisma.subscription.findMany({
      where: { tenantId, status: 'active' },
      select: { amount: true, currency: true, billingInterval: true },
    });

    const mrr: Record<string, number> = {};
    for (const sub of subscriptions) {
      const monthlyAmount = sub.amount * DashboardService.MONTHLY_FACTOR[sub.billingInterval];
      mrr[sub.currency] = Math.round(((mrr[sub.currency] || 0) + monthlyAmount) * 100) / 100;
    }

    const arr: Record<string, number> = {};
    for (const currency of Object.keys(mrr)) {
      arr[currency] = Math.round(mrr[currency] * 12 * 100) / 100;
    }

    return { mrr, arr, activeSubscriptions: subscriptions.length };
  }
}
