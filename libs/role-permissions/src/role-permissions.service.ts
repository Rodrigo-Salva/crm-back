import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolePermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.rolePermission.findMany({
      where: { tenantId },
      orderBy: [{ role: 'asc' }, { permission: 'asc' }],
    });
  }

  async findByRole(role: UserRole, tenantId: string) {
    return this.prisma.rolePermission.findMany({
      where: { role, tenantId },
    });
  }

  async setPermission(role: UserRole, permission: string, enabled: boolean, tenantId: string) {
    if (enabled) {
      const existing = await this.prisma.rolePermission.findUnique({
        where: { role_permission_tenantId: { role, permission, tenantId } },
      });
      if (existing) return existing;
      return this.prisma.rolePermission.create({ data: { role, permission, tenantId } });
    } else {
      await this.prisma.rolePermission.deleteMany({
        where: { role, permission, tenantId },
      });
      return { removed: true };
    }
  }

  async hasPermission(role: UserRole, permission: string, tenantId: string): Promise<boolean> {
    const count = await this.prisma.rolePermission.count({
      where: { role, permission, tenantId },
    });
    return count > 0;
  }

  async getEffectivePermissions(role: UserRole, tenantId: string): Promise<string[]> {
    const perms = await this.prisma.rolePermission.findMany({
      where: { role, tenantId },
      select: { permission: true },
    });
    return perms.map((p) => p.permission);
  }
}
