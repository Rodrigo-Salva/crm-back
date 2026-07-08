import { NotFoundException } from '@nestjs/common';
import { TicketsService } from './tickets.service';

describe('TicketsService', () => {
  let service: TicketsService;
  let prisma: any;
  let automation: any;
  let audit: any;
  let webhooks: any;
  let notifications: any;
  let realtime: any;

  beforeEach(() => {
    prisma = {
      ticket: { create: jest.fn(), findFirst: jest.fn(), update: jest.fn(), findMany: jest.fn() },
      ticketMessage: { create: jest.fn() },
      tenantSetting: { findUnique: jest.fn().mockResolvedValue(null), upsert: jest.fn() },
    };
    automation = { evaluate: jest.fn() };
    audit = { log: jest.fn() };
    webhooks = { emit: jest.fn() };
    notifications = { create: jest.fn() };
    realtime = { notifyUser: jest.fn(), broadcastToTenant: jest.fn() };
    service = new TicketsService(prisma, automation, audit, webhooks, notifications, realtime);
  });

  describe('create', () => {
    it('notifies the assignee in real time when the ticket is assigned to someone else', async () => {
      const ticket = { id: 'ticket-1', subject: 'Algo roto', assignedTo: 'agent-1' };
      prisma.ticket.create.mockResolvedValue(ticket);
      notifications.create.mockResolvedValue({ id: 'notif-1' });

      await service.create({ subject: 'Algo roto', assignedTo: 'agent-1' }, 'creator-1', 'tenant-1');

      expect(notifications.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: 'agent-1', link: '/tickets/ticket-1' }),
      );
      expect(realtime.notifyUser).toHaveBeenCalledWith('agent-1', 'notification:new', { id: 'notif-1' });
    });

    it('does not notify when the ticket is unassigned', async () => {
      prisma.ticket.create.mockResolvedValue({ id: 'ticket-1', subject: 'x', assignedTo: null });

      await service.create({ subject: 'x' }, 'creator-1', 'tenant-1');

      expect(notifications.create).not.toHaveBeenCalled();
      expect(realtime.notifyUser).not.toHaveBeenCalled();
    });

    it('does not notify when the creator assigns the ticket to themself', async () => {
      prisma.ticket.create.mockResolvedValue({ id: 'ticket-1', subject: 'x', assignedTo: 'creator-1' });

      await service.create({ subject: 'x', assignedTo: 'creator-1' }, 'creator-1', 'tenant-1');

      expect(notifications.create).not.toHaveBeenCalled();
    });

    it('computes the SLA deadline from priority', async () => {
      prisma.ticket.create.mockResolvedValue({ id: 'ticket-1', subject: 'x' });

      await service.create({ subject: 'x', priority: 'critical' }, 'creator-1', 'tenant-1');

      const callArgs = prisma.ticket.create.mock.calls[0][0];
      expect(callArgs.data.slaDeadline).toBeInstanceOf(Date);
    });
  });

  describe('update', () => {
    it('notifies the new assignee when reassigned', async () => {
      prisma.ticket.findFirst.mockResolvedValue({ id: 'ticket-1', assignedTo: 'agent-1' });
      prisma.ticket.update.mockResolvedValue({ id: 'ticket-1', subject: 'x', assignedTo: 'agent-2' });
      notifications.create.mockResolvedValue({ id: 'notif-2' });

      await service.update('ticket-1', { assignedTo: 'agent-2' }, 'tenant-1');

      expect(notifications.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: 'agent-2' }),
      );
    });

    it('does not notify when assignedTo is unchanged', async () => {
      prisma.ticket.findFirst.mockResolvedValue({ id: 'ticket-1', assignedTo: 'agent-1' });
      prisma.ticket.update.mockResolvedValue({ id: 'ticket-1', subject: 'x', assignedTo: 'agent-1' });

      await service.update('ticket-1', { assignedTo: 'agent-1' }, 'tenant-1');

      expect(notifications.create).not.toHaveBeenCalled();
    });

    it('throws NotFoundException for a ticket outside the tenant', async () => {
      prisma.ticket.findFirst.mockResolvedValue(null);

      await expect(service.update('missing', {}, 'tenant-1')).rejects.toThrow(NotFoundException);
    });
  });
});
