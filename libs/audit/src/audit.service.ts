import { Injectable } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(params: {
    entity: string;
    entityId: string;
    action: string;
    changes?: any;
    userId: string;
    tenantId: string;
  }) {
    return this.prisma.auditLog.create({ data: params });
  }

  async findByEntity(entity: string, entityId: string, tenantId: string) {
    return this.prisma.auditLog.findMany({
      where: { entity, entityId, tenantId },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async findByTenant(tenantId: string, limit = 50) {
    return this.prisma.auditLog.findMany({
      where: { tenantId },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async search(
    tenantId: string,
    filters: { entity?: string; action?: string; userId?: string; from?: string; to?: string; page?: number; limit?: number },
  ) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 50;

    const where: any = { tenantId };
    if (filters.entity) where.entity = filters.entity;
    if (filters.action) where.action = filters.action;
    if (filters.userId) where.userId = filters.userId;
    if (filters.from || filters.to) {
      where.createdAt = {};
      if (filters.from) where.createdAt.gte = new Date(filters.from);
      if (filters.to) where.createdAt.lte = new Date(filters.to);
    }

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include: { user: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return { data, total, page, limit };
  }
}
