import { Controller, Get, Post, Put, Body, Param, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { EmailService } from './email.service';
import { ImapService } from './imap.service';
import { CreateSmtpConfigDto } from './dto/create-smtp-config.dto';
import { CreateImapConfigDto } from './dto/create-imap-config.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { SendEmailDto } from './dto/send-email.dto';
import type { Response } from 'express';

@Controller('email')
@UseGuards(AuthGuard('jwt'))
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly imapService: ImapService,
  ) {}

  @Get('config')
  getConfig(@CurrentUser() user: any) {
    return this.emailService.getSmtpConfig(user.tenantId);
  }

  @Put('config')
  upsertConfig(@Body() dto: CreateSmtpConfigDto, @CurrentUser() user: any) {
    return this.emailService.upsertSmtpConfig(user.tenantId, dto);
  }

  @Get('imap-config')
  getImapConfig(@CurrentUser() user: any) {
    return this.imapService.getConfig(user.tenantId);
  }

  @Put('imap-config')
  upsertImapConfig(@Body() dto: CreateImapConfigDto, @CurrentUser() user: any) {
    return this.imapService.upsertConfig(user.tenantId, dto);
  }

  @Post('imap-sync')
  syncImap(@CurrentUser() user: any) {
    return this.imapService.syncMailbox(user.tenantId);
  }

  @Get('templates')
  getTemplates(@CurrentUser() user: any) {
    return this.emailService.getTemplates(user.tenantId);
  }

  @Post('templates')
  createTemplate(@Body() dto: CreateTemplateDto, @CurrentUser() user: any) {
    return this.emailService.createTemplate(dto, user.tenantId);
  }

  @Put('templates/:id')
  updateTemplate(@Param('id') id: string, @Body() dto: CreateTemplateDto, @CurrentUser() user: any) {
    return this.emailService.updateTemplate(id, dto, user.tenantId);
  }

  @Post('send')
  send(@Body() dto: SendEmailDto, @CurrentUser() user: any) {
    return this.emailService.sendEmail(dto, user.tenantId);
  }

  @Get('history')
  getHistory(@Query('contactId') contactId: string, @CurrentUser() user: any) {
    return this.emailService.getHistory(user.tenantId, contactId);
  }
}

@Controller()
export class EmailTrackingController {
  constructor(private readonly emailService: EmailService) {}

  @Get('email/track/:trackingId.png')
  async trackOpen(@Param('trackingId') trackingId: string, @Res() res: Response) {
    await this.emailService.trackOpen(trackingId);
    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.set('Content-Type', 'image/gif');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(pixel);
  }
}
