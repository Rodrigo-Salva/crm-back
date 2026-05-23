import { Controller, Get, Post, Put, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
@UseGuards(AuthGuard('jwt'))
export class WhatsappController {
  constructor(private readonly service: WhatsappService) {}

  @Put('config')
  upsertConfig(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.upsertConfig(dto, user.tenantId);
  }

  @Get('config')
  getConfig(@CurrentUser() user: any) {
    return this.service.getConfig(user.tenantId);
  }

  @Post('send')
  send(@Body() dto: { to: string; templateName: string; params?: Record<string, string> }, @CurrentUser() user: any) {
    return this.service.sendTemplate(user.tenantId, dto.to, dto.templateName, dto.params);
  }
}
