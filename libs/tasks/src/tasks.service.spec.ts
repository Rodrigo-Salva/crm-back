import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      task: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    service = new TasksService(prisma);
  });

  describe('create', () => {
    it('defaults status to pending and priority to medium when omitted', async () => {
      prisma.task.create.mockResolvedValue({ id: 'task-1' });

      await service.create({ title: 'Llamar al cliente' } as any, 'user-1', 'tenant-1');

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Llamar al cliente',
          status: 'pending',
          priority: 'medium',
          assigneeId: 'user-1',
          tenantId: 'tenant-1',
        }),
      });
    });

    it('passes through an explicit status and priority', async () => {
      prisma.task.create.mockResolvedValue({ id: 'task-2' });

      await service.create(
        { title: 'Seguimiento', status: 'in_progress', priority: 'high' } as any,
        'user-1',
        'tenant-1',
      );

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ status: 'in_progress', priority: 'high' }),
      });
    });
  });

  describe('findById', () => {
    it('throws NotFoundException when the task does not exist for this tenant', async () => {
      prisma.task.findFirst.mockResolvedValue(null);

      await expect(service.findById('missing', 'tenant-1')).rejects.toThrow(NotFoundException);
    });

    it('returns the task when found', async () => {
      const task = { id: 'task-1', title: 'X' };
      prisma.task.findFirst.mockResolvedValue(task);

      await expect(service.findById('task-1', 'tenant-1')).resolves.toEqual(task);
    });
  });

  describe('findAll', () => {
    it('filters by search, status, priority and date range', async () => {
      prisma.task.findMany.mockResolvedValue([]);

      await service.findAll(
        { search: 'cliente', status: 'pending', priority: 'high', dateFrom: '2026-01-01', dateTo: '2026-01-31' } as any,
        'tenant-1',
      );

      expect(prisma.task.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            tenantId: 'tenant-1',
            status: 'pending',
            priority: 'high',
            title: { contains: 'cliente', mode: 'insensitive' },
            dueDate: { gte: new Date('2026-01-01'), lte: new Date('2026-01-31') },
          }),
        }),
      );
    });
  });

  describe('update', () => {
    it('throws NotFoundException for a task outside the tenant', async () => {
      prisma.task.findFirst.mockResolvedValue(null);

      await expect(service.update('task-1', { title: 'x' } as any, 'tenant-1')).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.task.update).not.toHaveBeenCalled();
    });

    it('updates an existing task', async () => {
      prisma.task.findFirst.mockResolvedValue({ id: 'task-1', tenantId: 'tenant-1' });
      prisma.task.update.mockResolvedValue({ id: 'task-1', status: 'completed' });

      const result = await service.update('task-1', { status: 'completed' } as any, 'tenant-1');

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: 'task-1' },
        data: expect.objectContaining({ status: 'completed' }),
      });
      expect(result.status).toBe('completed');
    });
  });

  describe('remove', () => {
    it('throws NotFoundException instead of deleting a task from another tenant', async () => {
      prisma.task.findFirst.mockResolvedValue(null);

      await expect(service.remove('task-1', 'tenant-1')).rejects.toThrow(NotFoundException);
      expect(prisma.task.delete).not.toHaveBeenCalled();
    });
  });
});
