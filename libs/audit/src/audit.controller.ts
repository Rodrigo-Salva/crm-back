import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuditService } from './audit.service';
import { CurrentUser } from '@crm/auth';

@Controller('audit-logs')
@UseGuards(AuthGuard('jwt'))
export class AuditController {
  constructor(private readonly service: AuditService) {}

  @Get()
  findAll(@Query('limit') limit: string, @CurrentUser() user: any) {
    return this.service.findByTenant(user.tenantId, Number(limit) || 50);
  }

  @Get(':entity/:entityId')
  findByEntity(
    @Param('entity') entity: string,
    @Param('entityId') entityId: string,
    @CurrentUser() user: any,
  ) {
    return this.service.findByEntity(entity, entityId, user.tenantId);
  }
}
