import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';
import { ApiKeysService } from './api-keys.service';

@ApiTags('API Keys')
@ApiBearerAuth()
@Controller('api-keys')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ApiKeysController {
  constructor(private readonly service: ApiKeysService) {}

  @Post()
  @RequirePermission('manage_settings')
  @ApiOperation({ summary: 'Crea una nueva API key para integraciones externas' })
  create(@Body('name') name: string, @CurrentUser() user: any) {
    return this.service.create(name, user.tenantId);
  }

  @Get()
  @RequirePermission('manage_settings')
  @ApiOperation({ summary: 'Lista las API keys del tenant' })
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Patch(':id')
  @RequirePermission('manage_settings')
  @ApiOperation({ summary: 'Activa o desactiva una API key' })
  update(@Param('id') id: string, @Body() dto: { active?: boolean }, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  @RequirePermission('manage_settings')
  @ApiOperation({ summary: 'Elimina una API key' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
