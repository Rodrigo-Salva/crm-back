import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      note: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    service = new NotesService(prisma);
  });

  describe('findAll', () => {
    it('filters by relatedType, relatedId and tenantId', async () => {
      prisma.note.findMany.mockResolvedValue([]);

      await service.findAll('lead', 'lead-1', 'tenant-1');

      expect(prisma.note.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { relatedType: 'lead', relatedId: 'lead-1', tenantId: 'tenant-1' },
        }),
      );
    });
  });

  describe('create', () => {
    it('scopes the note to the author and the tenant', async () => {
      prisma.note.create.mockResolvedValue({ id: 'note-1' });

      await service.create({ content: 'hola', relatedType: 'lead', relatedId: 'lead-1' } as any, 'user-1', 'tenant-1');

      expect(prisma.note.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ authorId: 'user-1', tenantId: 'tenant-1' }),
        }),
      );
    });
  });

  describe('update', () => {
    it('throws NotFoundException for a note outside the tenant', async () => {
      prisma.note.findFirst.mockResolvedValue(null);

      await expect(service.update('note-1', { content: 'x' } as any, 'tenant-1', 'user-1', 'seller')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('forbids editing a note created by another non-admin user', async () => {
      prisma.note.findFirst.mockResolvedValue({ id: 'note-1', authorId: 'other-user' });

      await expect(service.update('note-1', { content: 'x' } as any, 'tenant-1', 'user-1', 'seller')).rejects.toThrow(
        ForbiddenException,
      );
      expect(prisma.note.update).not.toHaveBeenCalled();
    });

    it('allows an admin to edit a note created by another user', async () => {
      prisma.note.findFirst.mockResolvedValue({ id: 'note-1', authorId: 'other-user' });
      prisma.note.update.mockResolvedValue({ id: 'note-1', content: 'x' });

      await service.update('note-1', { content: 'x' } as any, 'tenant-1', 'user-1', 'admin');

      expect(prisma.note.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('allows the author to delete their own note', async () => {
      prisma.note.findFirst.mockResolvedValue({ id: 'note-1', authorId: 'user-1' });
      prisma.note.delete.mockResolvedValue({});

      const result = await service.remove('note-1', 'tenant-1', 'user-1', 'seller');

      expect(prisma.note.delete).toHaveBeenCalledWith({ where: { id: 'note-1' } });
      expect(result.message).toBe('Note deleted successfully');
    });
  });
});
