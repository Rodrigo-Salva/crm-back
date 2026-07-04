import { NotFoundException } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';

describe('ApiKeysService', () => {
  let service: ApiKeysService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      apiKey: { create: jest.fn(), findMany: jest.fn(), findFirst: jest.fn(), findUnique: jest.fn(), update: jest.fn(), updateMany: jest.fn(), delete: jest.fn() },
    };
    service = new ApiKeysService(prisma);
  });

  describe('create', () => {
    it('generates a key with the crm_ prefix and persists it scoped to the tenant', async () => {
      prisma.apiKey.create.mockResolvedValue({ id: 'key-1' });

      await service.create('My integration', 'tenant-1');

      expect(prisma.apiKey.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'My integration',
            tenantId: 'tenant-1',
            key: expect.stringMatching(/^crm_[0-9a-f]{48}$/),
          }),
        }),
      );
    });
  });

  describe('update', () => {
    it('updates the key scoped by tenant', async () => {
      await service.update('key-1', { active: false }, 'tenant-1');

      expect(prisma.apiKey.updateMany).toHaveBeenCalledWith({
        where: { id: 'key-1', tenantId: 'tenant-1' },
        data: { active: false },
      });
    });
  });

  describe('remove', () => {
    it('throws NotFoundException when the key does not belong to the tenant', async () => {
      prisma.apiKey.findFirst.mockResolvedValue(null);

      await expect(service.remove('key-1', 'tenant-1')).rejects.toThrow(NotFoundException);
      expect(prisma.apiKey.delete).not.toHaveBeenCalled();
    });

    it('deletes the key when it belongs to the tenant', async () => {
      prisma.apiKey.findFirst.mockResolvedValue({ id: 'key-1' });

      await service.remove('key-1', 'tenant-1');

      expect(prisma.apiKey.delete).toHaveBeenCalledWith({ where: { id: 'key-1' } });
    });
  });

  describe('validate', () => {
    it('returns null when the key does not exist or is inactive', async () => {
      prisma.apiKey.findUnique.mockResolvedValue(null);

      const result = await service.validate('crm_nonexistent');

      expect(result).toBeNull();
      expect(prisma.apiKey.update).not.toHaveBeenCalled();
    });

    it('returns the tenantId and bumps lastUsedAt for a valid key', async () => {
      prisma.apiKey.findUnique.mockResolvedValue({ id: 'key-1', tenantId: 'tenant-1' });

      const result = await service.validate('crm_valid');

      expect(result).toEqual({ tenantId: 'tenant-1' });
      expect(prisma.apiKey.update).toHaveBeenCalledWith({
        where: { id: 'key-1' },
        data: { lastUsedAt: expect.any(Date) },
      });
    });
  });
});
