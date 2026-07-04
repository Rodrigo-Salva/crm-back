import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let prisma: any;
  let webhooksService: any;

  beforeEach(() => {
    prisma = {
      quote: { findFirst: jest.fn(), update: jest.fn() },
      invoice: { findFirst: jest.fn(), update: jest.fn() },
      payment: { create: jest.fn() },
    };
    webhooksService = { emit: jest.fn().mockResolvedValue(undefined) };
    service = new PaymentsService(prisma, webhooksService);
  });

  describe('create', () => {
    it('throws BadRequestException when neither quoteId nor invoiceId is provided', async () => {
      await expect(service.create({ amount: 100, method: 'cash' } as any, 'user-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException when both quoteId and invoiceId are provided', async () => {
      await expect(
        service.create({ amount: 100, method: 'cash', quoteId: 'q1', invoiceId: 'i1' } as any, 'user-1', 'tenant-1'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('quote payments', () => {
    it('throws NotFoundException when the quote does not exist', async () => {
      prisma.quote.findFirst.mockResolvedValue(null);

      await expect(
        service.create({ amount: 100, method: 'cash', quoteId: 'q1' } as any, 'user-1', 'tenant-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('marks the quote as converted once fully paid', async () => {
      prisma.quote.findFirst.mockResolvedValue({ id: 'q1', grandTotal: 100, status: 'sent', payments: [] });
      prisma.payment.create.mockResolvedValue({ id: 'payment-1' });

      await service.create({ amount: 100, method: 'cash', quoteId: 'q1' } as any, 'user-1', 'tenant-1');

      expect(prisma.quote.update).toHaveBeenCalledWith({ where: { id: 'q1' }, data: { status: 'converted' } });
    });

    it('does not mark the quote as converted when the payment is partial', async () => {
      prisma.quote.findFirst.mockResolvedValue({ id: 'q1', grandTotal: 100, status: 'sent', payments: [] });
      prisma.payment.create.mockResolvedValue({ id: 'payment-1' });

      await service.create({ amount: 40, method: 'cash', quoteId: 'q1' } as any, 'user-1', 'tenant-1');

      expect(prisma.quote.update).not.toHaveBeenCalled();
    });
  });

  describe('invoice payments', () => {
    it('throws NotFoundException when the invoice does not exist', async () => {
      prisma.invoice.findFirst.mockResolvedValue(null);

      await expect(
        service.create({ amount: 100, method: 'cash', invoiceId: 'i1' } as any, 'user-1', 'tenant-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('marks the invoice as paid and emits invoice.paid once fully paid', async () => {
      prisma.invoice.findFirst.mockResolvedValue({ id: 'i1', amount: 500, status: 'sent', payments: [] });
      prisma.payment.create.mockResolvedValue({ id: 'payment-1' });
      prisma.invoice.update.mockResolvedValue({ id: 'i1', status: 'paid' });

      await service.create({ amount: 500, method: 'transfer', invoiceId: 'i1' } as any, 'user-1', 'tenant-1');

      expect(prisma.invoice.update).toHaveBeenCalledWith({
        where: { id: 'i1' },
        data: { status: 'paid', paidAt: expect.any(Date) },
      });
      expect(webhooksService.emit).toHaveBeenCalledWith(
        'invoice.paid',
        expect.objectContaining({ entity: 'invoice', entityId: 'i1' }),
        'tenant-1',
      );
    });

    it('does not mark the invoice as paid nor emit a webhook when the payment is partial', async () => {
      prisma.invoice.findFirst.mockResolvedValue({ id: 'i1', amount: 500, status: 'sent', payments: [] });
      prisma.payment.create.mockResolvedValue({ id: 'payment-1' });

      await service.create({ amount: 200, method: 'transfer', invoiceId: 'i1' } as any, 'user-1', 'tenant-1');

      expect(prisma.invoice.update).not.toHaveBeenCalled();
      expect(webhooksService.emit).not.toHaveBeenCalled();
    });
  });
});
