import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { TenantSettingsService } from './tenant-settings.service';

@Controller('tenant-settings')
@UseGuards(AuthGuard('jwt'))
export class TenantSettingsController {
  constructor(private readonly service: TenantSettingsService) {}

  @Get()
  get(@CurrentUser() user: any) {
    return this.service.get(user.tenantId);
  }

  @Put()
  update(@Body() settings: Record<string, string>, @CurrentUser() user: any) {
    return this.service.setBulk(settings, user.tenantId);
  }
}
