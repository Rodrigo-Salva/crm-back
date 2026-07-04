import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    service = new UsersService(prisma);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('rejects when the email is already registered', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'existing' });

      await expect(
        service.create({ email: 'a@test.com', name: 'A', password: 'Password1', role: 'seller' } as any, 'tenant-1'),
      ).rejects.toThrow(ConflictException);
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('hashes the password and scopes the new user to the tenant', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      prisma.user.create.mockResolvedValue({ id: 'user-1' });

      await service.create({ email: 'a@test.com', name: 'A', password: 'Password1', role: 'seller' } as any, 'tenant-1');

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ password: 'hashed-password', tenantId: 'tenant-1', role: 'seller' }),
        }),
      );
    });
  });

  describe('findAll', () => {
    it('filters users by tenantId', async () => {
      prisma.user.findMany.mockResolvedValue([]);

      await service.findAll('tenant-1');

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { tenantId: 'tenant-1' } }),
      );
    });
  });

  describe('findById', () => {
    it('throws NotFoundException when the user does not belong to the tenant', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.findById('user-1', 'tenant-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('prevents a user from deleting themselves', async () => {
      await expect(service.remove('user-1', 'tenant-1', 'user-1')).rejects.toThrow(BadRequestException);
      expect(prisma.user.delete).not.toHaveBeenCalled();
    });

    it('throws NotFoundException for a user outside the tenant', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.remove('user-2', 'tenant-1', 'user-1')).rejects.toThrow(NotFoundException);
      expect(prisma.user.delete).not.toHaveBeenCalled();
    });

    it('deletes an existing user from the tenant', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'user-2', tenantId: 'tenant-1' });
      prisma.user.delete.mockResolvedValue({});

      const result = await service.remove('user-2', 'tenant-1', 'user-1');

      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 'user-2' } });
      expect(result.message).toBe('User deleted successfully');
    });
  });
});
