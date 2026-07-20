import { Injectable } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { NubefactService } from './nubefact.service';

@Injectable()
export class InvoicingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly nubefact: NubefactService,
  ) {}

  private async getNextInvoiceNumber(tenantId: string): Promise<string> {
    const last = await this.prisma.invoice.findFirst({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      select: { number: true },
    });
    const lastNum = last ? parseInt(last.number.replace('INV-', ''), 10) : 0;
    return `INV-${String(lastNum + 1).padStart(5, '0')}`;
  }

  async createForQuote(quote: { id: string; grandTotal: number; currency: string }, tenantId: string) {
    const number = await this.getNextInvoiceNumber(tenantId);
    const invoice = await this.prisma.invoice.create({
      data: {
        number,
        quoteId: quote.id,
        currency: quote.currency as any,
        amount: quote.grandTotal,
        dueDate: new Date(),
        tenantId,
      },
    });

    await this.nubefact.issueInvoice(invoice.id, tenantId);
    return invoice;
  }

  async retry(invoiceId: string, tenantId: string) {
    await this.nubefact.issueInvoice(invoiceId, tenantId);
    return this.prisma.invoice.findFirst({ where: { id: invoiceId, tenantId } });
  }
}
