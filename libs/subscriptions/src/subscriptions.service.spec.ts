import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;
  let prisma: any;
  let notificationsService: any;

  beforeEach(() => {
    prisma = {
      subscription: { create: jest.fn(), findFirst: jest.fn(), update: jest.fn() },
      invoice: { create: jest.fn(), findFirst: jest.fn(), update: jest.fn() },
      task: { create: jest.fn() },
    };
    notificationsService = { create: jest.fn().mockResolvedValue(undefined) };
    service = new SubscriptionsService(prisma, notificationsService);
  });

  describe('addInterval', () => {
    const base = new Date('2026-01-15T00:00:00.000Z');

    it('adds 7 days for weekly', () => {
      expect(SubscriptionsService.addInterval(base, 'weekly').toISOString()).toBe('2026-01-22T00:00:00.000Z');
    });

    it('adds 1 month for monthly', () => {
      expect(SubscriptionsService.addInterval(base, 'monthly').toISOString()).toBe('2026-02-15T00:00:00.000Z');
    });

    it('adds 3 months for quarterly', () => {
      expect(SubscriptionsService.addInterval(base, 'quarterly').toISOString()).toBe('2026-04-15T00:00:00.000Z');
    });

    it('adds 1 year for yearly', () => {
      expect(SubscriptionsService.addInterval(base, 'yearly').toISOString()).toBe('2027-01-15T00:00:00.000Z');
    });
  });

  describe('pause', () => {
    it('throws BadRequestException when the subscription is not active', async () => {
      prisma.subscription.findFirst.mockResolvedValue({ id: 'sub-1', status: 'paused', contract: { leadId: 'lead-1' } });

      await expect(service.pause('sub-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });

    it('pauses an active subscription', async () => {
      prisma.subscription.findFirst.mockResolvedValue({ id: 'sub-1', status: 'active', contract: { leadId: 'lead-1' } });

      await service.pause('sub-1', 'tenant-1');

      expect(prisma.subscription.update).toHaveBeenCalledWith({ where: { id: 'sub-1' }, data: { status: 'paused' } });
    });
  });

  describe('cancel', () => {
    it('throws BadRequestException when already cancelled', async () => {
      prisma.subscription.findFirst.mockResolvedValue({ id: 'sub-1', status: 'cancelled', contract: { leadId: 'lead-1' } });

      await expect(service.cancel('sub-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('generateInvoice', () => {
    it('throws NotFoundException when the subscription does not exist', async () => {
      prisma.subscription.findFirst.mockResolvedValue(null);

      await expect(service.generateInvoice('sub-1', 'tenant-1')).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when the subscription is not active', async () => {
      prisma.subscription.findFirst.mockResolvedValue({ id: 'sub-1', status: 'paused' });

      await expect(service.generateInvoice('sub-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });

    it('creates the invoice, advances nextBillingDate, creates a task and notifies', async () => {
      const nextBillingDate = new Date('2026-01-15T00:00:00.000Z');
      prisma.subscription.findFirst.mockResolvedValue({
        id: 'sub-1',
        status: 'active',
        currency: 'MXN',
        amount: 500,
        nextBillingDate,
        billingInterval: 'monthly',
        contractId: 'contract-1',
        contract: { number: 'C-00001', createdById: 'owner-1', lead: { name: 'Rodrigo' } },
      });
      prisma.invoice.findFirst.mockResolvedValue(null);
      prisma.invoice.create.mockResolvedValue({ id: 'invoice-1', number: 'INV-00001' });

      const result = await service.generateInvoice('sub-1', 'tenant-1');

      expect(prisma.invoice.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ subscriptionId: 'sub-1', amount: 500, currency: 'MXN' }) }),
      );
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { id: 'sub-1' },
        data: { lastBilledAt: expect.any(Date), nextBillingDate: new Date('2026-02-15T00:00:00.000Z') },
      });
      expect(prisma.task.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ relatedType: 'invoice', relatedId: 'invoice-1', assigneeId: 'owner-1' }) }),
      );
      expect(notificationsService.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: 'owner-1', link: '/contracts/contract-1' }),
      );
      expect(result).toEqual({ id: 'invoice-1', number: 'INV-00001' });
    });
  });

  describe('sendInvoice', () => {
    it('throws NotFoundException when the invoice does not exist', async () => {
      prisma.invoice.findFirst.mockResolvedValue(null);

      await expect(service.sendInvoice('invoice-1', 'tenant-1')).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when the invoice is already paid', async () => {
      prisma.invoice.findFirst.mockResolvedValue({ id: 'invoice-1', status: 'paid' });

      await expect(service.sendInvoice('invoice-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });

    it('marks a pending invoice as sent', async () => {
      prisma.invoice.findFirst.mockResolvedValue({ id: 'invoice-1', status: 'pending' });

      await service.sendInvoice('invoice-1', 'tenant-1');

      expect(prisma.invoice.update).toHaveBeenCalledWith({
        where: { id: 'invoice-1' },
        data: { status: 'sent', sentAt: expect.any(Date) },
      });
    });
  });
});
