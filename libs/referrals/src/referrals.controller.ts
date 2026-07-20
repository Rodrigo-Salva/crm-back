import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';
import { ReferralsService } from './referrals.service';
import { SetReferralRateDto } from './dto/set-rate.dto';

@Controller('referrals')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ReferralsController {
  constructor(private readonly service: ReferralsService) {}

  @Get()
  findAll(
    @Query('referrerLeadId') referrerLeadId: string,
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('status') status: string,
    @CurrentUser() user: any,
  ) {
    return this.service.findAll(user.tenantId, {
      referrerLeadId: user?.isPortal ? user.id : (referrerLeadId || undefined),
      year: year ? parseInt(year, 10) : undefined,
      month: month ? parseInt(month, 10) : undefined,
      status: status || undefined,
    });
  }

  @Get('rate')
  async getRate(@CurrentUser() user: any) {
    const rate = await this.service.getRate(user.tenantId);
    return { rate };
  }

  @Patch('rate')
  @RequirePermission('manage_settings')
  setRate(@Body() dto: SetReferralRateDto, @CurrentUser() user: any) {
    return this.service.setRate(dto.rate, user.tenantId);
  }

  @Patch(':id/pay')
  @RequirePermission('manage_settings')
  markPaid(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.markPaid(id, user.tenantId);
  }
}
