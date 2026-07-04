import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard } from '@crm/role-permissions';

@Controller('activities')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ActivitiesController {
  constructor(private readonly service: ActivitiesService) {}

  @Post()
  create(@Body() dto: CreateActivityDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get()
  findAll(
    @Query('leadId') leadId: string,
    @Query('ownerId') ownerId: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @CurrentUser() user: any,
  ) {
    return this.service.findAll({ leadId, ownerId, from, to, tenantId: user.tenantId });
  }

  @Get('calendar')
  getCalendar(
    @Query('from') from: string,
    @Query('to') to: string,
    @CurrentUser() user: any,
  ) {
    return this.service.getCalendar(user.id, user.tenantId, from, to);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateActivityDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
