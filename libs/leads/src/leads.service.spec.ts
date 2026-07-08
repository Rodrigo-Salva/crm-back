import { NotFoundException, BadRequestException } from '@nestjs/common';
import { LeadsService } from './leads.service';

describe('LeadsService', () => {
  let service: LeadsService;
  let prisma: any;
  let webhooks: any;
  let realtime: any;
  let automation: any;
  let audit: any;

  beforeEach(() => {
    prisma = {
      lead: {
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      pipelineStage: { findFirst: jest.fn().mockResolvedValue(null), findMany: jest.fn().mockResolvedValue([]) },
      leadStageHistory: { create: jest.fn(), updateMany: jest.fn() },
    };
    prisma.$transaction = jest.fn((arg: any) =>
      typeof arg === 'function' ? arg(prisma) : Promise.all(arg),
    );
    webhooks = { emit: jest.fn() };
    realtime = { broadcastToTenant: jest.fn() };
    automation = { evaluate: jest.fn() };
    audit = { log: jest.fn() };
    service = new LeadsService(prisma, webhooks, realtime, automation, audit);
  });

  describe('create', () => {
    it('sends every dto field through to prisma.lead.create', async () => {
      prisma.lead.create.mockResolvedValue({ id: 'lead-1', name: 'Juan Perez' });

      await service.create(
        { name: 'Juan Perez', email: 'juan@test.com', phone: '555', company: 'Acme', source: 'referral', status: 'new', score: 10, notes: 'vip' },
        'owner-1',
        'tenant-1',
      );

      expect(prisma.lead.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: 'Juan Perez',
          email: 'juan@test.com',
          phone: '555',
          company: 'Acme',
          source: 'referral',
          status: 'new',
          score: 10,
          notes: 'vip',
          ownerId: 'owner-1',
          tenantId: 'tenant-1',
          value: 0,
          currency: 'MXN',
        }),
      });
    });

    it('defaults source and score when omitted, falling back to "new" when the tenant has no pipeline stages', async () => {
      prisma.lead.create.mockResolvedValue({ id: 'lead-2', name: 'Ana' });

      await service.create({ name: 'Ana' } as any, 'owner-1', 'tenant-1');

      expect(prisma.lead.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ source: 'web', status: 'new', score: 0 }),
      });
    });

    it('defaults the status to the tenant\'s first configured pipeline stage', async () => {
      prisma.pipelineStage.findFirst.mockResolvedValue({ id: 'stage-1', name: 'Nuevo' });
      prisma.lead.create.mockResolvedValue({ id: 'lead-1' });

      await service.create({ name: 'Ana' } as any, 'owner-1', 'tenant-1');

      expect(prisma.lead.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ status: 'Nuevo' }) }),
      );
    });

    it('keeps an explicit status instead of looking up the default', async () => {
      prisma.lead.create.mockResolvedValue({ id: 'lead-1' });

      await service.create({ name: 'Ana', status: 'Negociación' } as any, 'owner-1', 'tenant-1');

      expect(prisma.pipelineStage.findFirst).not.toHaveBeenCalled();
      expect(prisma.lead.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ status: 'Negociación' }) }),
      );
    });

    it('rejects an invalid currency', async () => {
      await expect(
        service.create({ name: 'Ana', currency: 'XXX' } as any, 'owner-1', 'tenant-1'),
      ).rejects.toThrow(BadRequestException);
      expect(prisma.lead.create).not.toHaveBeenCalled();
    });

    it('emits a lead.created webhook and notifies automation', async () => {
      const lead = { id: 'lead-1', name: 'Juan' };
      prisma.lead.create.mockResolvedValue(lead);

      await service.create({ name: 'Juan' } as any, 'owner-1', 'tenant-1');

      expect(webhooks.emit).toHaveBeenCalledWith('lead.created', lead, 'tenant-1');
      expect(automation.evaluate).toHaveBeenCalledWith('lead.created', expect.objectContaining({ id: 'lead-1' }), 'tenant-1');
      expect(audit.log).toHaveBeenCalledWith(expect.objectContaining({ entity: 'lead', action: 'created' }));
    });
  });

  describe('findById', () => {
    it('throws NotFoundException when the lead does not exist', async () => {
      prisma.lead.findFirst.mockResolvedValue(null);

      await expect(service.findById('missing', 'tenant-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('broadcasts a realtime event and audits the change when status changes', async () => {
      prisma.lead.findFirst.mockResolvedValue({ id: 'lead-1', tenantId: 'tenant-1' });
      prisma.lead.update.mockResolvedValue({ id: 'lead-1', ownerId: 'owner-1', status: 'Contactado' });

      const result = await service.update('lead-1', { status: 'Contactado' }, 'tenant-1');

      expect(prisma.lead.update).toHaveBeenCalledWith({ where: { id: 'lead-1' }, data: { status: 'Contactado' } });
      expect(realtime.broadcastToTenant).toHaveBeenCalledWith('tenant-1', 'lead:updated', expect.objectContaining({ status: 'Contactado' }));
      expect(result.status).toBe('Contactado');
    });

    it('rejects an invalid currency without touching prisma.update', async () => {
      prisma.lead.findFirst.mockResolvedValue({ id: 'lead-1', tenantId: 'tenant-1' });

      await expect(service.update('lead-1', { currency: 'ZZZ' } as any, 'tenant-1')).rejects.toThrow(BadRequestException);
      expect(prisma.lead.update).not.toHaveBeenCalled();
    });

    it('does not broadcast when status is unchanged', async () => {
      prisma.lead.findFirst.mockResolvedValue({ id: 'lead-1', tenantId: 'tenant-1' });
      prisma.lead.update.mockResolvedValue({ id: 'lead-1', name: 'Renamed' });

      await service.update('lead-1', { name: 'Renamed' }, 'tenant-1');

      expect(realtime.broadcastToTenant).not.toHaveBeenCalled();
    });
  });
});
