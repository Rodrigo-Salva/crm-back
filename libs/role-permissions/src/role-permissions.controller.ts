import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolePermissionsService } from './role-permissions.service';
import { SetPermissionDto } from './dto/set-permission.dto';
import { PermissionsGuard } from './permissions.guard';
import { RequirePermission } from './decorators/require-permission.decorator';

@Controller('role-permissions')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RolePermissionsController {
  constructor(private readonly service: RolePermissionsService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.user.tenantId);
  }

  @Get(':role')
  findByRole(@Param('role') role: string, @Req() req: any) {
    return this.service.findByRole(role as any, req.user.tenantId);
  }

  @Post()
  @RequirePermission('manage_settings')
  setPermission(
    @Body() body: SetPermissionDto,
    @Req() req: any,
  ) {
    return this.service.setPermission(body.role as any, body.permission, body.enabled, req.user.tenantId);
  }
}
