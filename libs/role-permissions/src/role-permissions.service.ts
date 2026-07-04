import { Injectable, ConflictException, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { UserRole } from '@prisma/client';

export const DEFAULT_ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: ['create', 'read', 'update', 'delete', 'export', 'manage_users', 'manage_settings'],
  seller: ['create', 'read', 'update', 'export'],
  reader: ['read'],
};

@Injectable()
export class RolePermissionsService implements OnModuleInit {
  private readonly logger = new Logger(RolePermissionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
    for (const tenant of tenants) {
      await this.seedDefaultsForTenant(tenant.id);
    }
    if (tenants.length > 0) {
      this.logger.log(`Checked default role permissions for ${tenants.length} tenant(s)`);
    }
  }

  async seedDefaultsForTenant(tenantId: string) {
    const existing = await this.prisma.rolePermission.count({ where: { tenantId } });
    if (existing > 0) return;

    const rows = Object.entries(DEFAULT_ROLE_PERMISSIONS).flatMap(([role, permissions]) =>
      permissions.map((permission) => ({ role: role as UserRole, permission, tenantId })),
    );
    await this.prisma.rolePermission.createMany({ data: rows, skipDuplicates: true });
  }

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
