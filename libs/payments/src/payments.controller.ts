import { Controller, Post, Get, Body, Param, UseGuards, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PermissionsGuard } from '@crm/role-permissions';

@Controller('payments')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get('quote/:quoteId')
  getByQuote(@Param('quoteId') quoteId: string, @CurrentUser() user: any) {
    return this.service.getByQuote(quoteId, user.tenantId);
  }

  @Get('invoice/:invoiceId')
  getByInvoice(@Param('invoiceId') invoiceId: string, @CurrentUser() user: any) {
    return this.service.getByInvoice(invoiceId, user.tenantId);
  }

  @Get(':id/receipt')
  async getReceiptPdf(@Param('id') id: string, @CurrentUser() user: any, @Res() res: Response) {
    const buffer = await this.service.generateReceiptPdf(id, user.tenantId);
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename="receipt-${id}.pdf"`);
    res.send(buffer);
  }
}
