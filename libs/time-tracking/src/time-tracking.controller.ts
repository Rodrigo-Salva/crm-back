import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { TimeTrackingService } from './time-tracking.service';

@Controller('time-entries')
@UseGuards(AuthGuard('jwt'))
export class TimeTrackingController {
  constructor(private readonly service: TimeTrackingService) {}

  @Post()
  create(@Body() dto: { taskId: string; description?: string; duration: number; date?: string }, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get()
  findAll(@Query('taskId') taskId: string, @Query('userId') userId: string, @Query('from') from: string, @Query('to') to: string, @CurrentUser() user: any) {
    if (taskId) return this.service.findByTask(taskId, user.tenantId);
    if (userId) return this.service.findByUser(userId, user.tenantId, from, to);
    return this.service.report(user.tenantId, from, to);
  }

  @Get('summary')
  summary(@Query('from') from: string, @Query('to') to: string, @CurrentUser() user: any) {
    return this.service.summary(user.tenantId, from, to);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
