import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AutomationService } from './automation.service';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';

@Controller('automations')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class AutomationController {
  constructor(private readonly service: AutomationService) {}

  @Post()
  @RequirePermission('manage_settings')
  create(@Body() dto: CreateAutomationDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findOne(id, user.tenantId);
  }

  @Patch(':id')
  @RequirePermission('manage_settings')
  update(@Param('id') id: string, @Body() dto: UpdateAutomationDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  @RequirePermission('manage_settings')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }

  @Post(':id/nodes')
  @RequirePermission('manage_settings')
  createNode(@Param('id') id: string, @Body() dto: CreateNodeDto, @CurrentUser() user: any) {
    return this.service.createNode(id, dto, user.tenantId);
  }

  @Patch(':id/nodes/:nodeId')
  @RequirePermission('manage_settings')
  updateNode(@Param('id') id: string, @Param('nodeId') nodeId: string, @Body() dto: UpdateNodeDto, @CurrentUser() user: any) {
    return this.service.updateNode(id, nodeId, dto, user.tenantId);
  }

  @Delete(':id/nodes/:nodeId')
  @RequirePermission('manage_settings')
  removeNode(@Param('id') id: string, @Param('nodeId') nodeId: string, @CurrentUser() user: any) {
    return this.service.removeNode(id, nodeId, user.tenantId);
  }

  @Post(':id/connections')
  @RequirePermission('manage_settings')
  createConnection(@Param('id') id: string, @Body() dto: CreateConnectionDto, @CurrentUser() user: any) {
    return this.service.createConnection(id, dto, user.tenantId);
  }

  @Delete(':id/connections/:connectionId')
  @RequirePermission('manage_settings')
  removeConnection(@Param('id') id: string, @Param('connectionId') connectionId: string, @CurrentUser() user: any) {
    return this.service.removeConnection(id, connectionId, user.tenantId);
  }
}
