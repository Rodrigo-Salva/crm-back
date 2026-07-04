import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';
import { SalesGoalsService } from './sales-goals.service';
import { UpsertSalesGoalDto } from './dto/create-sales-goal.dto';

@Controller('sales-goals')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class SalesGoalsController {
  constructor(private readonly service: SalesGoalsService) {}

  @Get()
  findAll(@Query('year') year: string, @Query('month') month: string, @CurrentUser() user: any) {
    const now = new Date();
    const y = year ? parseInt(year, 10) : now.getFullYear();
    const m = month ? parseInt(month, 10) : now.getMonth() + 1;
    return this.service.findAll(user.tenantId, y, m);
  }

  @Post()
  @RequirePermission('manage_settings')
  upsert(@Body() dto: UpsertSalesGoalDto, @CurrentUser() user: any) {
    return this.service.upsert(dto, user.tenantId);
  }

  @Delete(':id')
  @RequirePermission('manage_settings')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
