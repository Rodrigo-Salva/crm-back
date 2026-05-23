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
}
