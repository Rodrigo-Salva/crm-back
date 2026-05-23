import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { Currency } from '@prisma/client';
import { CreateQuoteDto } from './dto/create-quote.dto';
import Stripe from 'stripe';
const PDFDocument = require('pdfkit');

@Injectable()
export class QuotesService {
  private readonly logger = new Logger(QuotesService.name);
  private readonly appUrl: string;
  private stripe: Stripe;

  constructor(private readonly prisma: PrismaService) {
    this.appUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      apiVersion: '2025-01-27.acacia' as any,
    });
  }

  async getNextNumber(tenantId: string): Promise<string> {
    const last = await this.prisma.quote.findFirst({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      select: { number: true },
    });
    const lastNum = last ? parseInt(last.number.replace('Q-', ''), 10) : 0;
    return `Q-${String(lastNum + 1).padStart(5, '0')}`;
  }

  async create(dto: CreateQuoteDto, userId: string, tenantId: string) {
    // Validate currency is a valid enum value
    const currency = dto.currency ?? 'MXN';
    const validCurrencies = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];
    if (!validCurrencies.includes(currency)) {
      throw new BadRequestException(`Invalid currency: ${currency}`);
    }
    
    const number = await this.getNextNumber(tenantId);
    const items = dto.items.map((item) => {
      // Validate currency on line items too
      const itemCurrency = item.currency ?? currency;
      if (!validCurrencies.includes(itemCurrency)) {
        throw new BadRequestException(`Invalid currency on line item: ${itemCurrency}`);
      }
      
      const total = item.quantity * item.unitPrice * (1 - (item.discountPercent || 0) / 100);
      return { ...item, total: Math.round(total * 100) / 100, currency: itemCurrency as Currency };
    });

    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const itemDiscount = items.reduce((sum, i) => sum + (i.unitPrice * i.quantity * (i.discountPercent || 0) / 100), 0);
    const headerDiscount = subtotal * ((dto.discountPercent || 0) / 100);
    const discountTotal = itemDiscount + headerDiscount;
    const taxableAmount = subtotal - discountTotal;
    const taxPercent = dto.taxPercent || 0;
    const taxTotal = taxableAmount * (taxPercent / 100);
    const grandTotal = taxableAmount + taxTotal;

    return this.prisma.quote.create({
      data: {
        number,
        dealId: dto.dealId,
        contactId: dto.contactId,
        currency: currency as Currency,
        status: 'draft',
        subtotal: Math.round(subtotal * 100) / 100,
        discountTotal: Math.round(discountTotal * 100) / 100,
        taxTotal: Math.round(taxTotal * 100) / 100,
        grandTotal: Math.round(grandTotal * 100) / 100,
        discountPercent: dto.discountPercent || 0,
        notes: dto.notes,
        createdById: userId,
        tenantId,
        items: { create: items },
        versions: {
          create: {
            versionNumber: 1,
            data: JSON.parse(JSON.stringify({ dto, items, subtotal, discountTotal, taxTotal, grandTotal })),
          },
        },
      },
      include: { items: true, contact: { select: { id: true, name: true, email: true } } },
    });
  }

  async findAll(tenantId: string, contactId?: string) {
    const where: any = { tenantId };
    if (contactId) where.contactId = contactId;
    return this.prisma.quote.findMany({
      where,
      include: {
        contact: { select: { id: true, name: true, email: true } },
        deal: { select: { id: true, title: true } },
        items: true,
        approvalRequest: { select: { id: true, status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string, contactId?: string) {
    const where: any = { id, tenantId };
    if (contactId) where.contactId = contactId;
    const quote = await this.prisma.quote.findFirst({
      where,
      include: {
        contact: { select: { id: true, name: true, email: true, companyName: true } },
        deal: { select: { id: true, title: true, stage: true } },
        items: { include: { product: { select: { id: true, name: true, sku: true } } } },
        versions: { orderBy: { versionNumber: 'desc' } },
        approvalRequest: { include: { actions: { include: { user: { select: { id: true, name: true } } } } } },
        createdBy: { select: { id: true, name: true } },
      },
    });
    if (!quote) throw new NotFoundException('Quote not found');
    return quote;
  }

  async update(id: string, dto: CreateQuoteDto, userId: string, tenantId: string) {
    const existing = await this.findById(id, tenantId);
    if (existing.status !== 'draft') throw new BadRequestException('Only draft quotes can be edited');

    // Validate currency is a valid enum value
    const currency = dto.currency ?? 'MXN';
    const validCurrencies = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];
    if (!validCurrencies.includes(currency)) {
      throw new BadRequestException(`Invalid currency: ${currency}`);
    }

    const items = dto.items.map((item) => {
      // Validate currency on line items too
      const itemCurrency = item.currency ?? currency;
      if (!validCurrencies.includes(itemCurrency)) {
        throw new BadRequestException(`Invalid currency on line item: ${itemCurrency}`);
      }
      
      const total = item.quantity * item.unitPrice * (1 - (item.discountPercent || 0) / 100);
      return { ...item, total: Math.round(total * 100) / 100, currency: itemCurrency as Currency };
    });

    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const itemDiscount = items.reduce((sum, i) => sum + (i.unitPrice * i.quantity * (i.discountPercent || 0) / 100), 0);
    const headerDiscount = subtotal * ((dto.discountPercent || 0) / 100);
    const discountTotal = itemDiscount + headerDiscount;
    const taxableAmount = subtotal - discountTotal;
    const taxPercent = dto.taxPercent || 0;
    const taxTotal = taxableAmount * (taxPercent / 100);
    const grandTotal = taxableAmount + taxTotal;

    await this.prisma.quoteLineItem.deleteMany({ where: { quoteId: id } });

    const newVersion = existing.version + 1;
    return this.prisma.quote.update({
      where: { id },
      data: {
        dealId: dto.dealId,
        contactId: dto.contactId,
        currency: currency as Currency,
        subtotal: Math.round(subtotal * 100) / 100,
        discountTotal: Math.round(discountTotal * 100) / 100,
        taxTotal: Math.round(taxTotal * 100) / 100,
        grandTotal: Math.round(grandTotal * 100) / 100,
        discountPercent: dto.discountPercent || 0,
        notes: dto.notes,
        version: newVersion,
        items: { create: items },
        versions: {
          create: {
            versionNumber: newVersion,
            data: JSON.parse(JSON.stringify({ dto, items, subtotal, discountTotal, taxTotal, grandTotal })),
          },
        },
      },
      include: { items: true },
    });
  }

  async send(id: string, tenantId: string) {
    const quote = await this.findById(id, tenantId);
    if (quote.status !== 'draft') throw new BadRequestException('Quote already sent');

    const updated = await this.prisma.quote.update({
      where: { id },
      data: { status: 'sent' },
    });

    if (quote.contact?.email) {
      await this.sendQuoteEmail(quote);
    }

    return updated;
  }

  async requestApproval(id: string, reason: string, userId: string, tenantId: string) {
    const quote = await this.findById(id, tenantId);

    const existing = await this.prisma.approvalRequest.findUnique({ where: { quoteId: id } });
    if (existing) throw new BadRequestException('Approval already requested');

    return this.prisma.approvalRequest.create({
      data: {
        quoteId: id,
        reason,
        requestedBy: userId,
        discountPercent: quote.discountPercent ?? 0,
      },
    });
  }

  async approve(id: string, userId: string, comment: string | undefined, tenantId: string) {
    const request = await this.prisma.approvalRequest.findFirst({
      where: { quoteId: id, status: 'pending' },
      include: { quote: true },
    });
    if (!request || request.quote.tenantId !== tenantId) throw new NotFoundException('Pending approval not found');

    await this.prisma.approvalAction.create({
      data: { approvalRequestId: request.id, action: 'approved', comment, userId },
    });

    await this.prisma.approvalRequest.update({ where: { id: request.id }, data: { status: 'approved' } });
    await this.prisma.quote.update({ where: { id }, data: { status: 'approved' } });

    return { message: 'Quote approved' };
  }

  async reject(id: string, userId: string, comment: string | undefined, tenantId: string) {
    const request = await this.prisma.approvalRequest.findFirst({
      where: { quoteId: id, status: 'pending' },
      include: { quote: true },
    });
    if (!request || request.quote.tenantId !== tenantId) throw new NotFoundException('Pending approval not found');

    await this.prisma.approvalAction.create({
      data: { approvalRequestId: request.id, action: 'rejected', comment, userId },
    });

    await this.prisma.approvalRequest.update({ where: { id: request.id }, data: { status: 'rejected' } });

    return { message: 'Quote rejected' };
  }

  async getQuotePdf(id: string, tenantId: string): Promise<Buffer> {
    const quote = await this.findById(id, tenantId);

    return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Primary Brand Color
      const primaryColor = '#2563eb';
      const secondaryColor = '#64748b';

      // Header Banner
      doc.rect(0, 0, doc.page.width, 100).fill(primaryColor);
      doc.fillColor('#ffffff').fontSize(28).font('Helvetica-Bold').text('COTIZACIÓN', 50, 40);
      doc.fontSize(12).font('Helvetica').text(`Nº: ${quote.number}`, 50, 75);

      // Info Section
      doc.fillColor('#333333');
      doc.fontSize(10).font('Helvetica-Bold').text('Preparado para:', 50, 130);
      doc.font('Helvetica').text(quote.contact?.name || 'Cliente sin nombre', 50, 145);
      if (quote.contact?.companyName) doc.text(quote.contact.companyName, 50, 160);
      if (quote.contact?.email) doc.text(quote.contact.email, 50, 175);

      doc.font('Helvetica-Bold').text('Detalles:', 350, 130);
      doc.font('Helvetica').text(`Fecha: ${new Date(quote.createdAt).toLocaleDateString()}`, 350, 145);
      doc.text(`Moneda: ${quote.currency}`, 350, 160);
      doc.text(`Negocio: ${quote.deal?.title || 'N/A'}`, 350, 175);

      doc.moveDown(3);

      // Table Header
      let y = 220;
      doc.rect(50, y, 495, 25).fill('#f1f5f9');
      doc.fillColor('#333333').font('Helvetica-Bold').fontSize(10);
      doc.text('Descripción', 60, y + 8);
      doc.text('Cant.', 300, y + 8, { width: 50, align: 'right' });
      doc.text('P.U.', 360, y + 8, { width: 60, align: 'right' });
      doc.text('Desc.', 430, y + 8, { width: 50, align: 'right' });
      doc.text('Total', 490, y + 8, { width: 50, align: 'right' });

      y += 35;

      // Table Rows
      doc.font('Helvetica');
      for (const item of quote.items) {
        doc.text(item.description, 60, y, { width: 230 });
        doc.text(item.quantity.toString(), 300, y, { width: 50, align: 'right' });
        doc.text(`$${item.unitPrice.toLocaleString()}`, 360, y, { width: 60, align: 'right' });
        doc.text(`${item.discountPercent || 0}%`, 430, y, { width: 50, align: 'right' });
        doc.text(`$${item.total.toLocaleString()}`, 490, y, { width: 50, align: 'right' });
        
        y += 20;
        doc.moveTo(50, y).lineTo(545, y).lineWidth(0.5).strokeColor('#e2e8f0').stroke();
        y += 10;
        
        if (y > 700) {
          doc.addPage();
          y = 50;
        }
      }

      // Totals
      y += 10;
      const tX = 350;
      doc.font('Helvetica').fontSize(10);
      doc.text('Subtotal:', tX, y, { width: 100 });
      doc.text(`$${quote.subtotal.toLocaleString()}`, tX + 100, y, { width: 90, align: 'right' });
      
      if (quote.discountTotal > 0) {
        y += 20;
        doc.text('Descuento:', tX, y, { width: 100 });
        doc.text(`-$${quote.discountTotal.toLocaleString()}`, tX + 100, y, { width: 90, align: 'right' });
      }

      y += 20;
      doc.text(`Impuesto (${quote.taxTotal > 0 ? quote.items[0]?.taxPercent || 0 : 0}%):`, tX, y, { width: 100 });
      doc.text(`$${quote.taxTotal.toLocaleString()}`, tX + 100, y, { width: 90, align: 'right' });

      y += 20;
      doc.rect(tX, y - 5, 195, 25).fill('#f8fafc');
      doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(14);
      doc.text('TOTAL:', tX + 5, y, { width: 90 });
      doc.text(`$${quote.grandTotal.toLocaleString()}`, tX + 90, y, { width: 95, align: 'right' });

      // Footer
      const bottom = doc.page.height - 50;
      doc.fillColor(secondaryColor).fontSize(8).font('Helvetica');
      doc.text('Gracias por su preferencia.', 50, bottom, { align: 'center' });
      
      if (quote.stripePaymentUrl) {
        doc.fillColor(primaryColor).text('Puede pagar esta cotización en línea haciendo clic aquí.', 50, bottom + 15, { align: 'center', link: quote.stripePaymentUrl });
      }

      doc.end();
    });
  }

  async generateCheckoutSession(quoteId: string, tenantId: string) {
    const quote = await this.findById(quoteId, tenantId);
    if (quote.status !== 'approved' && quote.status !== 'sent') {
      throw new BadRequestException('Quote must be sent or approved to be paid');
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: quote.items.map(item => ({
        price_data: {
          currency: item.currency.toLowerCase(),
          product_data: {
            name: item.description,
          },
          unit_amount: Math.round(item.unitPrice * (1 - (item.discountPercent || 0) / 100) * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${this.appUrl}/quotes/${quoteId}?success=true`,
      cancel_url: `${this.appUrl}/quotes/${quoteId}?canceled=true`,
      client_reference_id: quoteId,
    });

    await this.prisma.quote.update({
      where: { id: quoteId },
      data: {
        stripePaymentUrl: session.url,
      },
    });

    return { url: session.url };
  }

  async handleStripeWebhook(event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const quoteId = session.client_reference_id;
      if (quoteId) {
        await this.prisma.quote.update({
          where: { id: quoteId },
          data: { status: 'converted', stripePaymentIntentId: session.payment_intent as string },
        });
        this.logger.log(`Quote ${quoteId} marked as converted via Stripe`);
      }
    }
  }

  private async sendQuoteEmail(quote: any) {
    try {
      const { EmailService } = require('@crm/email');
      // Email sending is handled by the caller in the controller
    } catch {}
  }
}
