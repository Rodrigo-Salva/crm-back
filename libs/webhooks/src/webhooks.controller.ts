import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
@UseGuards(AuthGuard('jwt'))
export class WebhooksController {
  constructor(private readonly service: WebhooksService) {}

  @Post()
  create(@Body() dto: { url: string; events: string[]; secret?: string }, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: { url?: string; events?: string[]; secret?: string; active?: boolean }, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
