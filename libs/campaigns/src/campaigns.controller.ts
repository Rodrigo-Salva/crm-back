import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/create-campaign.dto';
import { PermissionsGuard } from '@crm/role-permissions';

@Controller('campaigns')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class CampaignsController {
  constructor(private readonly service: CampaignsService) {}

  @Post()
  create(@Body() dto: CreateCampaignDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId, user.id);
  }

  @Get()
  findAll(@Query('search') search: string, @CurrentUser() user: any) {
    return this.service.findAll(user.tenantId, search);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCampaignDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }

  @Post(':id/send')
  send(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.send(id, user.tenantId);
  }

  @Get(':id/stats')
  getStats(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.getStats(id, user.tenantId);
  }
}
