import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolePermissionsService } from './role-permissions.service';
import { CurrentUser } from '@crm/auth';

@Controller('role-permissions')
@UseGuards(AuthGuard('jwt'))
export class RolePermissionsController {
  constructor(private readonly service: RolePermissionsService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Get(':role')
  findByRole(@Param('role') role: string, @CurrentUser() user: any) {
    return this.service.findByRole(role as any, user.tenantId);
  }

  @Post()
  setPermission(
    @Body() body: { role: string; permission: string; enabled: boolean },
    @CurrentUser() user: any,
  ) {
    return this.service.setPermission(body.role as any, body.permission, body.enabled, user.tenantId);
  }
}
