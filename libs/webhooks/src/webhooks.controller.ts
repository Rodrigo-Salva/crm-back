import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '@crm/auth';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/create-webhook.dto';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';

@ApiTags('Webhooks')
@ApiBearerAuth()
@Controller('webhooks')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class WebhooksController {
  constructor(private readonly service: WebhooksService) {}

  @Post()
  @RequirePermission('manage_settings')
  @ApiOperation({ summary: 'Registra un webhook saliente para uno o más eventos' })
  create(@Body() dto: CreateWebhookDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista los webhooks del tenant' })
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Get(':id/logs')
  @ApiOperation({ summary: 'Historial de entregas de un webhook (últimas 50)' })
  findLogs(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findLogs(id, user.tenantId);
  }

  @Patch(':id')
  @RequirePermission('manage_settings')
  @ApiOperation({ summary: 'Actualiza un webhook' })
  update(@Param('id') id: string, @Body() dto: UpdateWebhookDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  @RequirePermission('manage_settings')
  @ApiOperation({ summary: 'Elimina un webhook' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
