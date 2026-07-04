import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';

@Controller('custom-fields')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class CustomFieldsController {
  constructor(private readonly customFieldsService: CustomFieldsService) {}

  @Post()
  @RequirePermission('manage_settings')
  create(@Body() dto: CreateCustomFieldDto, @CurrentUser() user: any) {
    return this.customFieldsService.create(dto, user.tenantId);
  }

  @Get()
  findAll(@Query('entity') entity: string, @CurrentUser() user: any) {
    return this.customFieldsService.findAll(entity, user.tenantId);
  }

  @Patch(':id')
  @RequirePermission('manage_settings')
  update(@Param('id') id: string, @Body() dto: UpdateCustomFieldDto, @CurrentUser() user: any) {
    return this.customFieldsService.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  @RequirePermission('manage_settings')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.customFieldsService.remove(id, user.tenantId);
  }
}
