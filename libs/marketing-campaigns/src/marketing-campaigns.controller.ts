import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';
import { MarketingCampaignsService } from './marketing-campaigns.service';
import { CreateMarketingCampaignDto, UpdateMarketingCampaignDto } from './dto/create-marketing-campaign.dto';

@Controller('marketing-campaigns')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class MarketingCampaignsController {
  constructor(private readonly service: MarketingCampaignsService) {}

  @Post()
  @RequirePermission('manage_settings')
  create(@Body() dto: CreateMarketingCampaignDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId);
  }

  @Get(':id/stats')
  getStats(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.getStats(id, user.tenantId);
  }

  @Patch(':id')
  @RequirePermission('manage_settings')
  update(@Param('id') id: string, @Body() dto: UpdateMarketingCampaignDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  @RequirePermission('manage_settings')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
