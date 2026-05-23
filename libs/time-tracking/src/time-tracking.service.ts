import { Injectable } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class TimeTrackingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: { taskId: string; description?: string; duration: number; date?: string }, userId: string, tenantId: string) {
    return this.prisma.timeEntry.create({
      data: {
        taskId: dto.taskId,
        userId,
        description: dto.description,
        duration: dto.duration,
        date: dto.date ? new Date(dto.date) : new Date(),
        tenantId,
      },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async findByTask(taskId: string, tenantId: string) {
    return this.prisma.timeEntry.findMany({
      where: { taskId, tenantId },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async findByUser(userId: string, tenantId: string, from?: string, to?: string) {
    const where: any = { userId, tenantId };
    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) where.date.lte = new Date(to);
    }
    return this.prisma.timeEntry.findMany({
      where,
      include: { task: { select: { id: true, title: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async report(tenantId: string, from?: string, to?: string) {
    const where: any = { tenantId };
    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) where.date.lte = new Date(to);
    }
    const entries = await this.prisma.timeEntry.findMany({
      where,
      include: {
        user: { select: { id: true, name: true } },
        task: { select: { id: true, title: true } },
      },
      orderBy: { date: 'desc' },
    });
    return entries;
  }

  async summary(tenantId: string, from?: string, to?: string) {
    const where: any = { tenantId };
    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) where.date.lte = new Date(to);
    }
    const entries = await this.prisma.timeEntry.findMany({ where, select: { duration: true, userId: true } });
    const byUser: Record<string, number> = {};
    let total = 0;
    for (const e of entries) {
      byUser[e.userId] = (byUser[e.userId] || 0) + e.duration;
      total += e.duration;
    }
    return { total, byUser };
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.timeEntry.deleteMany({ where: { id, tenantId } });
  }
}
