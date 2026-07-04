import { BadRequestException } from '@nestjs/common';
import { PublicApiService } from './public-api.service';

describe('PublicApiService', () => {
  let service: PublicApiService;
  let prisma: any;
  let leadsService: any;
  let ticketsService: any;

  beforeEach(() => {
    prisma = { user: { findFirst: jest.fn() } };
    leadsService = { create: jest.fn(), findById: jest.fn() };
    ticketsService = { create: jest.fn(), findById: jest.fn() };
    service = new PublicApiService(prisma, leadsService, ticketsService);
  });

  describe('createLead', () => {
    it('throws BadRequestException when no admin/superadmin exists for the tenant', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.createLead({ name: 'External Lead' } as any, 'tenant-1')).rejects.toThrow(BadRequestException);
      expect(leadsService.create).not.toHaveBeenCalled();
    });

    it('delegates to LeadsService.create with the resolved owner', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'owner-1' });
      leadsService.create.mockResolvedValue({ id: 'lead-1' });
      const dto = { name: 'External Lead' };

      const result = await service.createLead(dto as any, 'tenant-1');

      expect(leadsService.create).toHaveBeenCalledWith(dto, 'owner-1', 'tenant-1');
      expect(result).toEqual({ id: 'lead-1' });
    });
  });

  describe('getLead', () => {
    it('delegates to LeadsService.findById with an api-role user shape', async () => {
      leadsService.findById.mockResolvedValue({ id: 'lead-1' });

      await service.getLead('lead-1', 'tenant-1');

      expect(leadsService.findById).toHaveBeenCalledWith('lead-1', { tenantId: 'tenant-1', role: 'api' });
    });
  });

  describe('createTicket', () => {
    it('throws BadRequestException when no admin/superadmin exists for the tenant', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.createTicket({ subject: 'Help' } as any, 'tenant-1')).rejects.toThrow(BadRequestException);
    });

    it('delegates to TicketsService.create with the resolved owner', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'owner-1' });
      ticketsService.create.mockResolvedValue({ id: 'ticket-1' });
      const dto = { subject: 'Help' };

      const result = await service.createTicket(dto as any, 'tenant-1');

      expect(ticketsService.create).toHaveBeenCalledWith(dto, 'owner-1', 'tenant-1');
      expect(result).toEqual({ id: 'ticket-1' });
    });
  });

  describe('getTicket', () => {
    it('delegates to TicketsService.findById', async () => {
      ticketsService.findById.mockResolvedValue({ id: 'ticket-1' });

      await service.getTicket('ticket-1', 'tenant-1');

      expect(ticketsService.findById).toHaveBeenCalledWith('ticket-1', 'tenant-1');
    });
  });
});
