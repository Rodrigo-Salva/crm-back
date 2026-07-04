import { AuditService } from './audit.service';

describe('AuditService', () => {
  let service: AuditService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      auditLog: { create: jest.fn(), findMany: jest.fn(), count: jest.fn() },
    };
    service = new AuditService(prisma);
  });

  describe('search', () => {
    it('always scopes the query to the tenant even without filters', async () => {
      prisma.auditLog.findMany.mockResolvedValue([]);
      prisma.auditLog.count.mockResolvedValue(0);

      await service.search('tenant-1', {});

      expect(prisma.auditLog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { tenantId: 'tenant-1' } }),
      );
    });

    it('combines entity, action and date range filters', async () => {
      prisma.auditLog.findMany.mockResolvedValue([]);
      prisma.auditLog.count.mockResolvedValue(0);

      await service.search('tenant-1', {
        entity: 'lead',
        action: 'updated',
        from: '2026-06-01',
        to: '2026-06-24',
      });

      expect(prisma.auditLog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            tenantId: 'tenant-1',
            entity: 'lead',
            action: 'updated',
            createdAt: { gte: new Date('2026-06-01'), lte: new Date('2026-06-24') },
          },
        }),
      );
    });

    it('paginates using page and limit, defaulting to page 1 and limit 50', async () => {
      prisma.auditLog.findMany.mockResolvedValue([]);
      prisma.auditLog.count.mockResolvedValue(0);

      const result = await service.search('tenant-1', { page: 2, limit: 10 });

      expect(prisma.auditLog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 10, take: 10 }),
      );
      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);

      await service.search('tenant-1', {});
      expect(prisma.auditLog.findMany).toHaveBeenCalledWith(expect.objectContaining({ skip: 0, take: 50 }));
    });
  });
});
