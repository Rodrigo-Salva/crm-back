import { Controller, Get, Post, Put, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';
import { WhatsappService } from './whatsapp.service';
import { UpsertWhatsappConfigDto, SendWhatsappDto } from './dto/whatsapp.dto';

@Controller('whatsapp')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class WhatsappController {
  constructor(private readonly service: WhatsappService) {}

  @Put('config')
  @RequirePermission('manage_settings')
  upsertConfig(@Body() dto: UpsertWhatsappConfigDto, @CurrentUser() user: any) {
    return this.service.upsertConfig(dto, user.tenantId);
  }

  @Get('config')
  getConfig(@CurrentUser() user: any) {
    return this.service.getConfig(user.tenantId);
  }

  @Post('send')
  send(@Body() dto: SendWhatsappDto, @CurrentUser() user: any) {
    return this.service.sendTemplate(user.tenantId, dto.to, dto.templateName, dto.params);
  }
}
