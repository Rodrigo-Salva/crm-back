import { Controller, Get, Put, Body, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { TenantSettingsService } from './tenant-settings.service';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';

@Controller('tenant-settings')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class TenantSettingsController {
  constructor(private readonly service: TenantSettingsService) {}

  @Get()
  get(@CurrentUser() user: any) {
    return this.service.get(user.tenantId);
  }

  @Put()
  @RequirePermission('manage_settings')
  update(@Body(new ValidationPipe({ whitelist: false })) settings: Record<string, string>, @CurrentUser() user: any) {
    return this.service.setBulk(settings, user.tenantId);
  }
}
