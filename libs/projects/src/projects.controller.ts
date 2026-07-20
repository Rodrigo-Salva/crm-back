import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard } from '@crm/role-permissions';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/create-project.dto';

@Controller('projects')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Post()
  create(@Body() dto: CreateProjectDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
