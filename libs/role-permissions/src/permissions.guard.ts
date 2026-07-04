import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolePermissionsService } from './role-permissions.service';
import { PERMISSION_KEY } from './decorators/require-permission.decorator';

const METHOD_PERMISSION: Record<string, string> = {
  GET: 'read',
  POST: 'create',
  PATCH: 'update',
  PUT: 'update',
  DELETE: 'delete',
};

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly rolePermissions: RolePermissionsService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.tenantId || !user.role) return true;
    if (user.isPortal) return true;
    if (user.role === 'superadmin') return true;

    const override = this.reflector.get<string>(PERMISSION_KEY, context.getHandler());
    const permission = override || METHOD_PERMISSION[request.method] || 'read';

    const allowed = await this.rolePermissions.hasPermission(user.role, permission, user.tenantId);
    if (!allowed) {
      throw new ForbiddenException(`No tienes permiso para "${permission}"`);
    }
    return true;
  }
}
