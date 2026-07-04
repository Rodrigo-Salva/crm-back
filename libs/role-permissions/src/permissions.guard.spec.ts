import { ForbiddenException } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';

function makeContext(user: any, method = 'GET', handlerPermission?: string) {
  return {
    switchToHttp: () => ({ getRequest: () => ({ user, method }) }),
    getHandler: () => ({ __permission: handlerPermission }),
  } as any;
}

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let rolePermissions: any;
  let reflector: any;

  beforeEach(() => {
    rolePermissions = { hasPermission: jest.fn() };
    reflector = { get: jest.fn().mockReturnValue(undefined) };
    guard = new PermissionsGuard(rolePermissions, reflector);
  });

  it('allows the request when there is no authenticated user (public routes)', async () => {
    const result = await guard.canActivate(makeContext(undefined));
    expect(result).toBe(true);
    expect(rolePermissions.hasPermission).not.toHaveBeenCalled();
  });

  it('allows portal contacts without checking permissions', async () => {
    const result = await guard.canActivate(
      makeContext({ id: 'c1', tenantId: 't1', role: 'reader', isPortal: true }),
    );
    expect(result).toBe(true);
    expect(rolePermissions.hasPermission).not.toHaveBeenCalled();
  });

  it('always allows superadmin regardless of configured permissions', async () => {
    const result = await guard.canActivate(
      makeContext({ id: 'u1', tenantId: 't1', role: 'superadmin' }, 'DELETE'),
    );
    expect(result).toBe(true);
    expect(rolePermissions.hasPermission).not.toHaveBeenCalled();
  });

  it('maps HTTP method to the generic permission and checks it', async () => {
    rolePermissions.hasPermission.mockResolvedValue(true);

    await guard.canActivate(makeContext({ id: 'u1', tenantId: 't1', role: 'seller' }, 'DELETE'));

    expect(rolePermissions.hasPermission).toHaveBeenCalledWith('seller', 'delete', 't1');
  });

  it('uses the @RequirePermission override instead of the method mapping', async () => {
    rolePermissions.hasPermission.mockResolvedValue(true);
    reflector.get.mockReturnValue('manage_settings');

    await guard.canActivate(makeContext({ id: 'u1', tenantId: 't1', role: 'admin' }, 'POST'));

    expect(rolePermissions.hasPermission).toHaveBeenCalledWith('admin', 'manage_settings', 't1');
  });

  it('throws ForbiddenException when the role lacks the permission', async () => {
    rolePermissions.hasPermission.mockResolvedValue(false);

    await expect(
      guard.canActivate(makeContext({ id: 'u1', tenantId: 't1', role: 'reader' }, 'POST')),
    ).rejects.toThrow(ForbiddenException);
  });
});
