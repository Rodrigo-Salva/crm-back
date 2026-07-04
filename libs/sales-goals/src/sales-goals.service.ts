import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { UpsertSalesGoalDto } from './dto/create-sales-goal.dto';

@Injectable()
export class SalesGoalsService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(dto: UpsertSalesGoalDto, tenantId: string) {
    return this.prisma.salesGoal.upsert({
      where: { userId_year_month: { userId: dto.userId, year: dto.year, month: dto.month } },
      create: { ...dto, tenantId },
      update: { targetValue: dto.targetValue, targetDeals: dto.targetDeals },
    });
  }

  async remove(id: string, tenantId: string) {
    const goal = await this.prisma.salesGoal.findFirst({ where: { id, tenantId } });
    if (!goal) throw new NotFoundException('Meta no encontrada');
    return this.prisma.salesGoal.delete({ where: { id } });
  }

  async findAll(tenantId: string, year: number, month: number) {
    const [users, goals, wonStages] = await Promise.all([
      this.prisma.user.findMany({
        where: { tenantId, role: { in: ['admin', 'seller'] } },
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      }),
      this.prisma.salesGoal.findMany({ where: { tenantId, year, month } }),
      this.prisma.pipelineStage.findMany({ where: { tenantId, isWon: true }, select: { name: true } }),
    ]);

    const wonNames = wonStages.map((s) => s.name);
    const periodStart = new Date(year, month - 1, 1);
    const periodEnd = new Date(year, month, 1);

    const progress = await this.prisma.lead.groupBy({
      by: ['ownerId'],
      where: {
        tenantId,
        status: { in: wonNames },
        updatedAt: { gte: periodStart, lt: periodEnd },
      },
      _sum: { value: true },
      _count: { _all: true },
    });

    const progressByUser = new Map(progress.map((p) => [p.ownerId, p]));
    const goalsByUser = new Map(goals.map((g) => [g.userId, g]));

    return users.map((user) => {
      const goal = goalsByUser.get(user.id);
      const prog = progressByUser.get(user.id);
      const actualValue = prog?._sum.value ?? 0;
      const actualDeals = prog?._count._all ?? 0;
      const targetValue = goal?.targetValue ?? 0;

      return {
        userId: user.id,
        userName: user.name,
        goalId: goal?.id ?? null,
        targetValue,
        targetDeals: goal?.targetDeals ?? null,
        actualValue,
        actualDeals,
        progressPercent: targetValue > 0 ? Math.min(100, Math.round((actualValue / targetValue) * 100)) : null,
      };
    });
  }
}
