import { Controller, Get, Post, Patch, Body, Param, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import type { Response } from 'express';

@Controller('quotes')
@UseGuards(AuthGuard('jwt'))
export class QuotesController {
  constructor(private readonly service: QuotesService) {}

  @Post()
  create(@Body() dto: CreateQuoteDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    if (user.isPortal) {
      return this.service.findAll(user.tenantId, user.id);
    }
    return this.service.findAll(user.tenantId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    if (user.isPortal) {
      return this.service.findById(id, user.tenantId, user.id);
    }
    return this.service.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateQuoteDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.id, user.tenantId);
  }

  @Post(':id/send')
  send(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.send(id, user.tenantId);
  }

  @Post(':id/request-approval')
  requestApproval(@Param('id') id: string, @Body('reason') reason: string, @CurrentUser() user: any) {
    return this.service.requestApproval(id, reason, user.id, user.tenantId);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string, @Body('comment') comment: string, @CurrentUser() user: any) {
    return this.service.approve(id, user.id, comment, user.tenantId);
  }

  @Post(':id/reject')
  reject(@Param('id') id: string, @Body('comment') comment: string, @CurrentUser() user: any) {
    return this.service.reject(id, user.id, comment, user.tenantId);
  }

  @Post(':id/pay')
  generatePayment(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.generateCheckoutSession(id, user.tenantId);
  }

  @Get(':id/pdf')
  async getPdf(@Param('id') id: string, @CurrentUser() user: any, @Res() res: Response) {
    const buffer = await this.service.getQuotePdf(id, user.tenantId);
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename=quote-${id}.pdf`);
    res.send(buffer);
  }
}
