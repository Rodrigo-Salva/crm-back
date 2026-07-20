import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';
import { CommissionsService } from './commissions.service';
import { SetDefaultRateDto, SetUserRateDto } from './dto/set-rate.dto';

@Controller('commissions')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class CommissionsController {
  constructor(private readonly service: CommissionsService) {}

  @Get()
  findAll(
    @Query('userId') userId: string,
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('status') status: string,
    @CurrentUser() user: any,
  ) {
    return this.service.findAll(user.tenantId, {
      userId: userId || undefined,
      year: year ? parseInt(year, 10) : undefined,
      month: month ? parseInt(month, 10) : undefined,
      status: status || undefined,
    });
  }

  @Get('rates')
  getRates(@CurrentUser() user: any) {
    return this.service.getRates(user.tenantId);
  }

  @Patch('rates/default')
  @RequirePermission('manage_settings')
  setDefaultRate(@Body() dto: SetDefaultRateDto, @CurrentUser() user: any) {
    return this.service.setDefaultRate(dto.rate, user.tenantId);
  }

  @Patch('rates/:userId')
  @RequirePermission('manage_settings')
  setUserRate(@Param('userId') userId: string, @Body() dto: SetUserRateDto, @CurrentUser() user: any) {
    return this.service.setUserRate(userId, dto.rate, user.tenantId);
  }

  @Patch(':id/pay')
  @RequirePermission('manage_settings')
  markPaid(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.markPaid(id, user.tenantId);
  }
}
