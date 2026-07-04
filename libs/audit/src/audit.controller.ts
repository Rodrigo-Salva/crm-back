import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuditService } from './audit.service';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';

@Controller('audit-logs')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class AuditController {
  constructor(private readonly service: AuditService) {}

  @Get()
  @RequirePermission('manage_settings')
  findAll(
    @Query('entity') entity: string,
    @Query('action') action: string,
    @Query('userId') userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @CurrentUser() user: any,
  ) {
    return this.service.search(user.tenantId, {
      entity,
      action,
      userId,
      from,
      to,
      page: Number(page) || undefined,
      limit: Number(limit) || undefined,
    });
  }

  @Get(':entity/:entityId')
  @RequirePermission('manage_settings')
  findByEntity(
    @Param('entity') entity: string,
    @Param('entityId') entityId: string,
    @CurrentUser() user: any,
  ) {
    return this.service.findByEntity(entity, entityId, user.tenantId);
  }
}
