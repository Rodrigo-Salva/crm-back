import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { WebhooksService } from '@crm/webhooks';
import { CreatePaymentDto } from './dto/create-payment.dto';
const PDFDocument = require('pdfkit');

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly webhooksService: WebhooksService,
  ) {}

  async create(dto: CreatePaymentDto, userId: string, tenantId: string) {
    if (!dto.quoteId && !dto.invoiceId) {
      throw new BadRequestException('quoteId or invoiceId is required');
    }
    if (dto.quoteId && dto.invoiceId) {
      throw new BadRequestException('Provide only one of quoteId or invoiceId');
    }

    if (dto.quoteId) {
      return this.createForQuote(dto, dto.quoteId, userId, tenantId);
    }
    return this.createForInvoice(dto, dto.invoiceId!, userId, tenantId);
  }

  private async createForQuote(dto: CreatePaymentDto, quoteId: string, userId: string, tenantId: string) {
    const quote = await this.prisma.quote.findFirst({
      where: { id: quoteId, tenantId },
      include: { payments: true }
    });
    if (!quote) throw new NotFoundException('Quote not found');

    const payment = await this.prisma.payment.create({
      data: {
        amount: dto.amount,
        method: dto.method,
        reference: dto.reference,
        notes: dto.notes,
        quoteId,
        createdById: userId,
        tenantId,
      }
    });

    const totalPaid = quote.payments.reduce((sum, p) => sum + p.amount, 0) + dto.amount;
    if (totalPaid >= quote.grandTotal && quote.status !== 'converted') {
      await this.prisma.quote.update({
        where: { id: quote.id },
        data: { status: 'converted' }
      });
    }

    return payment;
  }

  private async createForInvoice(dto: CreatePaymentDto, invoiceId: string, userId: string, tenantId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id: invoiceId, tenantId },
      include: { payments: true }
    });
    if (!invoice) throw new NotFoundException('Invoice not found');

    const payment = await this.prisma.payment.create({
      data: {
        amount: dto.amount,
        method: dto.method,
        reference: dto.reference,
        notes: dto.notes,
        invoiceId,
        createdById: userId,
        tenantId,
      }
    });

    const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0) + dto.amount;
    if (totalPaid >= invoice.amount && invoice.status !== 'paid') {
      const updatedInvoice = await this.prisma.invoice.update({
        where: { id: invoice.id },
        data: { status: 'paid', paidAt: new Date() }
      });
      await this.webhooksService.emit('invoice.paid', { ...updatedInvoice, entity: 'invoice', entityId: updatedInvoice.id }, tenantId);
    }

    return payment;
  }

  async getByQuote(quoteId: string, tenantId: string) {
    return this.prisma.payment.findMany({
      where: { quoteId, tenantId },
      orderBy: { createdAt: 'desc' },
      include: { createdBy: { select: { id: true, name: true } } }
    });
  }

  async getByInvoice(invoiceId: string, tenantId: string) {
    return this.prisma.payment.findMany({
      where: { invoiceId, tenantId },
      orderBy: { createdAt: 'desc' },
      include: { createdBy: { select: { id: true, name: true } } }
    });
  }

  async generateReceiptPdf(id: string, tenantId: string): Promise<Buffer> {
    const payment = await this.prisma.payment.findFirst({
      where: { id, tenantId },
      include: {
        quote: { include: { lead: true } },
        invoice: { include: { subscription: { include: { contract: { include: { lead: true } } } } } },
        tenant: true
      }
    });
    if (!payment) throw new NotFoundException('Payment not found');

    const relatedNumber = payment.quote?.number ?? payment.invoice?.number ?? 'N/A';
    const clientName = payment.quote?.lead?.name ?? payment.invoice?.subscription?.contract?.lead?.name ?? 'N/A';
    const relatedTotal = payment.quote?.grandTotal ?? payment.invoice?.amount ?? 0;
    const relatedLabel = payment.quoteId ? 'Cotización Relacionada' : 'Factura Relacionada';

    return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      const primaryColor = '#10b981'; // emerald
      const secondaryColor = '#64748b';

      doc.rect(0, 0, doc.page.width, 100).fill(primaryColor);
      doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('RECIBO DE PAGO', 50, 40);

      doc.fillColor('#333333');
      doc.fontSize(12).font('Helvetica-Bold').text('Detalles del Pago', 50, 130);
      doc.font('Helvetica').text(`Monto: $${payment.amount.toLocaleString()}`, 50, 150);
      doc.text(`Fecha: ${new Date(payment.createdAt).toLocaleDateString()}`, 50, 165);
      doc.text(`Método: ${payment.method}`, 50, 180);
      if (payment.reference) doc.text(`Referencia: ${payment.reference}`, 50, 195);

      doc.font('Helvetica-Bold').text(`${relatedLabel}:`, 350, 130);
      doc.font('Helvetica').text(`Nº: ${relatedNumber}`, 350, 150);
      doc.text(`Cliente: ${clientName}`, 350, 165);
      doc.text(`Total: $${relatedTotal.toLocaleString()}`, 350, 180);

      // Footer
      const bottom = doc.page.height - 50;
      doc.fillColor(secondaryColor).fontSize(8).font('Helvetica');
      doc.text('Gracias por su pago.', 50, bottom, { align: 'center' });

      doc.end();
    });
  }
}
