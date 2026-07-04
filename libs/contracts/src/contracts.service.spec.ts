import * as crypto from 'crypto';
import { NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { ContractsService } from './contracts.service';

describe('ContractsService', () => {
  let service: ContractsService;
  let prisma: any;
  let subscriptionsService: any;
  let playbooksService: any;
  let webhooksService: any;

  beforeEach(() => {
    prisma = {
      quote: { findFirst: jest.fn() },
      contract: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn() },
    };
    subscriptionsService = { createForContract: jest.fn().mockResolvedValue({}) };
    playbooksService = { startRunsForTrigger: jest.fn().mockResolvedValue(undefined) };
    webhooksService = { emit: jest.fn().mockResolvedValue(undefined) };
    service = new ContractsService(prisma, subscriptionsService, playbooksService, webhooksService);
  });

  describe('create', () => {
    const dto = { quoteId: 'quote-1', content: 'terms', billingInterval: 'monthly', amount: 100, currency: 'MXN' };

    it('throws NotFoundException when the quote does not exist for the tenant', async () => {
      prisma.quote.findFirst.mockResolvedValue(null);

      await expect(service.create(dto as any, 'user-1', 'tenant-1')).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when the quote is not approved or converted', async () => {
      prisma.quote.findFirst.mockResolvedValue({ id: 'quote-1', status: 'draft', leadId: 'lead-1' });

      await expect(service.create(dto as any, 'user-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException when the quote has no associated lead', async () => {
      prisma.quote.findFirst.mockResolvedValue({ id: 'quote-1', status: 'approved', leadId: null });

      await expect(service.create(dto as any, 'user-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });

    it('creates the contract and its subscription when the quote is valid', async () => {
      prisma.quote.findFirst.mockResolvedValue({ id: 'quote-1', status: 'approved', leadId: 'lead-1', currency: 'USD' });
      prisma.contract.findFirst.mockResolvedValueOnce(null); // getNextNumber
      prisma.contract.create.mockResolvedValue({ id: 'contract-1' });
      prisma.contract.findFirst.mockResolvedValueOnce({ id: 'contract-1', status: 'draft' }); // findById inside create

      await service.create(dto as any, 'user-1', 'tenant-1');

      expect(prisma.contract.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ quoteId: 'quote-1', leadId: 'lead-1', createdById: 'user-1', tenantId: 'tenant-1' }) }),
      );
      expect(subscriptionsService.createForContract).toHaveBeenCalledWith(
        'contract-1',
        expect.objectContaining({ billingInterval: 'monthly', amount: 100, currency: 'MXN' }),
        'tenant-1',
      );
    });
  });

  describe('send', () => {
    it('throws BadRequestException when the contract is not a draft', async () => {
      prisma.contract.findFirst.mockResolvedValue({ id: 'contract-1', status: 'sent' });

      await expect(service.send('contract-1', 'tenant-1')).rejects.toThrow(BadRequestException);
    });

    it('marks the contract as sent', async () => {
      prisma.contract.findFirst.mockResolvedValue({ id: 'contract-1', status: 'draft' });
      prisma.contract.update.mockResolvedValue({ id: 'contract-1', status: 'sent' });

      await service.send('contract-1', 'tenant-1');

      expect(prisma.contract.update).toHaveBeenCalledWith({
        where: { id: 'contract-1' },
        data: { status: 'sent', sentAt: expect.any(Date) },
      });
    });
  });

  describe('accept', () => {
    const portalUser = { id: 'lead-1', tenantId: 'tenant-1', isPortal: true };

    it('throws ForbiddenException when the requester is not a portal user', async () => {
      await expect(service.accept('contract-1', { isPortal: false }, '127.0.0.1')).rejects.toThrow(ForbiddenException);
    });

    it('throws NotFoundException when the contract does not exist or belongs to another lead', async () => {
      prisma.contract.findFirst.mockResolvedValue({ id: 'contract-1', leadId: 'someone-else' });

      await expect(service.accept('contract-1', portalUser, '127.0.0.1')).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when the contract has not been sent yet', async () => {
      prisma.contract.findFirst.mockResolvedValue({ id: 'contract-1', leadId: 'lead-1', status: 'draft' });

      await expect(service.accept('contract-1', portalUser, '127.0.0.1')).rejects.toThrow(BadRequestException);
    });

    it('accepts the contract, hashes the content, and fires the playbook trigger and webhook', async () => {
      const content = 'terms and conditions';
      prisma.contract.findFirst.mockResolvedValue({ id: 'contract-1', leadId: 'lead-1', status: 'sent', content });
      const updated = { id: 'contract-1', leadId: 'lead-1', status: 'accepted' };
      prisma.contract.update.mockResolvedValue(updated);

      const result = await service.accept('contract-1', portalUser, '127.0.0.1');

      const expectedHash = crypto.createHash('sha256').update(content).digest('hex');
      expect(prisma.contract.update).toHaveBeenCalledWith({
        where: { id: 'contract-1' },
        data: expect.objectContaining({
          status: 'accepted',
          acceptedByUserId: 'lead-1',
          acceptedIp: '127.0.0.1',
          documentHash: expectedHash,
        }),
      });
      expect(playbooksService.startRunsForTrigger).toHaveBeenCalledWith('contract_accepted', {
        leadId: 'lead-1',
        contractId: 'contract-1',
        tenantId: 'tenant-1',
      });
      expect(webhooksService.emit).toHaveBeenCalledWith(
        'contract.accepted',
        expect.objectContaining({ entity: 'contract', entityId: 'contract-1' }),
        'tenant-1',
      );
      expect(result).toBe(updated);
    });
  });
});
