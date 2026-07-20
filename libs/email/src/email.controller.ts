import { Controller, Get, Post, Put, Body, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';
import { EmailService } from './email.service';
import { ImapService } from './imap.service';
import { CreateSmtpConfigDto } from './dto/create-smtp-config.dto';
import { CreateImapConfigDto } from './dto/create-imap-config.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { SendEmailDto } from './dto/send-email.dto';
import type { Response } from 'express';

@Controller('email')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly imapService: ImapService,
  ) {}

  @Get('config')
  async getConfig(@Req() req: any) {
    const user = req.user;
    const [smtp, imap] = await Promise.all([
      this.emailService.getSmtpConfig(user.tenantId).catch(() => null),
      this.imapService.getConfig(user.tenantId),
    ]);
    return { smtp, imap };
  }

  @Put('config')
  @RequirePermission('manage_settings')
  upsertConfig(@Body() dto: CreateSmtpConfigDto, @Req() req: any) {
    return this.emailService.upsertSmtpConfig(req.user.tenantId, dto);
  }

  @Get('imap-config')
  getImapConfig(@Req() req: any) {
    return this.imapService.getConfig(req.user.tenantId);
  }

  @Put('imap-config')
  @RequirePermission('manage_settings')
  upsertImapConfig(@Body() dto: CreateImapConfigDto, @Req() req: any) {
    return this.imapService.upsertConfig(req.user.tenantId, dto);
  }

  @Post('imap-sync')
  syncImap(@Req() req: any) {
    return this.imapService.syncMailbox(req.user.tenantId);
  }

  @Get('templates')
  getTemplates(@Req() req: any) {
    return this.emailService.getTemplates(req.user.tenantId);
  }

  @Post('templates')
  createTemplate(@Body() dto: CreateTemplateDto, @Req() req: any) {
    return this.emailService.createTemplate(dto, req.user.tenantId);
  }

  @Put('templates/:id')
  updateTemplate(@Param('id') id: string, @Body() dto: CreateTemplateDto, @Req() req: any) {
    return this.emailService.updateTemplate(id, dto, req.user.tenantId);
  }

  @Post('send')
  send(@Body() dto: SendEmailDto, @Req() req: any) {
    return this.emailService.sendEmail(dto, req.user.tenantId);
  }

  @Get('history')
  getHistory(@Query('leadId') leadId: string, @Req() req: any) {
    return this.emailService.getHistory(req.user.tenantId, leadId);
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

  @Get('email/click/:trackingId')
  async trackClick(@Param('trackingId') trackingId: string, @Query('url') url: string, @Res() res: Response) {
    if (!url || !/^https?:\/\//i.test(url)) {
      return res.status(400).send('Invalid url');
    }
    await this.emailService.trackClick(trackingId);
    res.redirect(url);
  }
}
