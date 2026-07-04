import * as crypto from 'crypto';
import { NotFoundException } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('WebhooksService', () => {
  let service: WebhooksService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      webhook: { findMany: jest.fn(), findFirst: jest.fn() },
      webhookLog: { create: jest.fn().mockResolvedValue({}), findMany: jest.fn() },
    };
    service = new WebhooksService(prisma);
    (global as any).fetch = jest.fn();
  });

  describe('emit', () => {
    it('only sends to webhooks subscribed to the emitted event', async () => {
      prisma.webhook.findMany.mockResolvedValue([
        { id: 'wh-other', url: 'http://other', events: ['other.event'], active: true },
        { id: 'wh-match', url: 'http://match', events: ['lead.created'], active: true },
      ]);
      (global.fetch as jest.Mock).mockResolvedValue({ status: 200, text: () => Promise.resolve('ok') });

      await service.emit('lead.created', { id: 'lead-1' }, 'tenant-1');
      await flushPromises();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('http://match', expect.any(Object));
    });

    it('sends to webhooks subscribed to the wildcard event', async () => {
      prisma.webhook.findMany.mockResolvedValue([{ id: 'wh-wild', url: 'http://wild', events: ['*'], active: true }]);
      (global.fetch as jest.Mock).mockResolvedValue({ status: 200, text: () => Promise.resolve('ok') });

      await service.emit('anything.happened', {}, 'tenant-1');
      await flushPromises();

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('HMAC signing', () => {
    it('adds an X-Signature header matching HMAC-SHA256 of the body when a secret is set', async () => {
      prisma.webhook.findMany.mockResolvedValue([
        { id: 'wh-1', url: 'http://sink', events: ['lead.created'], active: true, secret: 'shh' },
      ]);
      (global.fetch as jest.Mock).mockResolvedValue({ status: 200, text: () => Promise.resolve('ok') });

      await service.emit('lead.created', { id: 'lead-1' }, 'tenant-1');
      await flushPromises();

      const [, options] = (global.fetch as jest.Mock).mock.calls[0];
      const expectedSignature = 'sha256=' + crypto.createHmac('sha256', 'shh').update(options.body).digest('hex');
      expect(options.headers['X-Signature']).toBe(expectedSignature);
      expect(options.headers['X-Webhook-Secret']).toBe('shh');
    });

    it('omits the signature header when no secret is configured', async () => {
      prisma.webhook.findMany.mockResolvedValue([
        { id: 'wh-1', url: 'http://sink', events: ['lead.created'], active: true, secret: null },
      ]);
      (global.fetch as jest.Mock).mockResolvedValue({ status: 200, text: () => Promise.resolve('ok') });

      await service.emit('lead.created', { id: 'lead-1' }, 'tenant-1');
      await flushPromises();

      const [, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(options.headers['X-Signature']).toBeUndefined();
    });
  });

  describe('retries', () => {
    it('retries up to 3 times and logs a single failed delivery', async () => {
      prisma.webhook.findMany.mockResolvedValue([{ id: 'wh-1', url: 'http://down', events: ['lead.created'], active: true }]);
      (global.fetch as jest.Mock).mockRejectedValue(new Error('network down'));

      await service.emit('lead.created', {}, 'tenant-1');
      await flushPromises();
      await flushPromises();

      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(prisma.webhookLog.create).toHaveBeenCalledTimes(1);
      expect(prisma.webhookLog.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ webhookId: 'wh-1', status: 0, retries: 3 }) }),
      );
    });
  });

  describe('findLogs', () => {
    it('throws NotFoundException when the webhook does not belong to the tenant', async () => {
      prisma.webhook.findFirst.mockResolvedValue(null);

      await expect(service.findLogs('wh-1', 'tenant-1')).rejects.toThrow(NotFoundException);
    });

    it('returns the last 50 logs ordered by most recent', async () => {
      prisma.webhook.findFirst.mockResolvedValue({ id: 'wh-1' });
      prisma.webhookLog.findMany.mockResolvedValue([{ id: 'log-1' }]);

      const result = await service.findLogs('wh-1', 'tenant-1');

      expect(prisma.webhookLog.findMany).toHaveBeenCalledWith({
        where: { webhookId: 'wh-1' },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      expect(result).toEqual([{ id: 'log-1' }]);
    });
  });
});
