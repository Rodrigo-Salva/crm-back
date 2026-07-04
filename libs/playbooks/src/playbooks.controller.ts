import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PlaybooksService } from './playbooks.service';
import { CreatePlaybookDto } from './dto/create-playbook.dto';
import { UpdatePlaybookDto } from './dto/update-playbook.dto';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';

@Controller('playbooks')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class PlaybooksController {
  constructor(private readonly service: PlaybooksService) {}

  @Post()
  @RequirePermission('manage_settings')
  create(@Body() dto: CreatePlaybookDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Get('runs')
  getRunsForLead(@Query('leadId') leadId: string, @CurrentUser() user: any) {
    return this.service.getRunsForLead(leadId, user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findOne(id, user.tenantId);
  }

  @Patch(':id')
  @RequirePermission('manage_settings')
  update(@Param('id') id: string, @Body() dto: UpdatePlaybookDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  @RequirePermission('manage_settings')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
