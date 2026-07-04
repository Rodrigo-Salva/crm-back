import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PipelineStagesService } from './pipeline-stages.service';
import { CreatePipelineStageDto } from './dto/create-pipeline-stage.dto';
import { UpdatePipelineStageDto } from './dto/update-pipeline-stage.dto';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';

@Controller('pipeline-stages')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class PipelineStagesController {
  constructor(private readonly service: PipelineStagesService) {}

  @Post()
  @RequirePermission('manage_settings')
  create(@Body() dto: CreatePipelineStageDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Patch(':id')
  @RequirePermission('manage_settings')
  update(@Param('id') id: string, @Body() dto: UpdatePipelineStageDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  @RequirePermission('manage_settings')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
