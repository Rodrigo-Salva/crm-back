import { BadRequestException } from '@nestjs/common';
import { QuotesService } from './quotes.service';

describe('QuotesService', () => {
  let service: QuotesService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      quote: { findFirst: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
      quoteLineItem: { deleteMany: jest.fn() },
    };
    const webhooksService: any = { emit: jest.fn() };
    service = new QuotesService(prisma, webhooksService);
    jest.spyOn(service, 'getNextNumber').mockResolvedValue('Q-00001');
  });

  const baseDto = {
    contactId: 'contact-1',
    currency: 'MXN',
    items: [
      { description: 'Producto A', quantity: 2, unitPrice: 100, discountPercent: 10 },
      { description: 'Producto B', quantity: 1, unitPrice: 50 },
    ],
  };

  describe('create', () => {
    it('rejects an invalid header currency', async () => {
      await expect(service.create({ ...baseDto, currency: 'XXX' } as any, 'user-1', 'tenant-1')).rejects.toThrow(BadRequestException);
      expect(prisma.quote.create).not.toHaveBeenCalled();
    });

    it('rejects an invalid line item currency', async () => {
      const dto = { ...baseDto, items: [{ ...baseDto.items[0], currency: 'ZZZ' }] };
      await expect(service.create(dto as any, 'user-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });

    it('computes item totals, subtotal, discount, tax and grand total correctly', async () => {
      prisma.quote.create.mockImplementation(({ data }: any) => Promise.resolve(data));

      const result: any = await service.create({ ...baseDto, discountPercent: 5, taxPercent: 16 } as any, 'user-1', 'tenant-1');

      // item A: 2 * 100 * (1 - 10/100) = 180 ; item B: 1 * 50 = 50
      expect(result.items.create[0].total).toBe(180);
      expect(result.items.create[1].total).toBe(50);

      // subtotal = 2*100 + 1*50 = 250
      expect(result.subtotal).toBe(250);

      // item discount = 100*2*10/100 = 20 ; header discount = 250*5/100 = 12.5 -> total discount = 32.5
      expect(result.discountTotal).toBe(32.5);

      // taxable = 250 - 32.5 = 217.5 ; tax = 217.5*16/100 = 34.8
      expect(result.taxTotal).toBe(34.8);
      expect(result.grandTotal).toBe(252.3);
    });

    it('defaults discountPercent and taxPercent to 0 when omitted', async () => {
      prisma.quote.create.mockImplementation(({ data }: any) => Promise.resolve(data));

      const result: any = await service.create(baseDto as any, 'user-1', 'tenant-1');

      expect(result.discountPercent).toBe(0);
      expect(result.discountTotal).toBe(20); // only the 10% item discount on Producto A
      expect(result.taxTotal).toBe(0);
      expect(result.grandTotal).toBe(230);
    });
  });

  describe('update', () => {
    it('rejects editing a quote that is not in draft status', async () => {
      prisma.quote.findFirst.mockResolvedValue({ id: 'quote-1', status: 'sent', tenantId: 'tenant-1', items: [] });

      await expect(service.update('quote-1', baseDto as any, 'user-1', 'tenant-1')).rejects.toThrow(BadRequestException);
      expect(prisma.quoteLineItem.deleteMany).not.toHaveBeenCalled();
    });
  });

  describe('send', () => {
    it('rejects sending a quote that already left draft status', async () => {
      prisma.quote.findFirst.mockResolvedValue({ id: 'quote-1', status: 'sent', tenantId: 'tenant-1', items: [] });

      await expect(service.send('quote-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });
  });
});
