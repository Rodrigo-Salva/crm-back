import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(relatedType: string, relatedId: string, tenantId: string) {
    return this.prisma.note.findMany({
      where: { relatedType, relatedId, tenantId },
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateNoteDto, authorId: string, tenantId: string) {
    return this.prisma.note.create({
      data: { ...dto, authorId, tenantId },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async update(id: string, dto: UpdateNoteDto, tenantId: string, userId: string, userRole: string) {
    const note = await this.findOneOrThrow(id, tenantId);
    this.assertCanModify(note, userId, userRole);

    return this.prisma.note.update({
      where: { id },
      data: dto,
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async remove(id: string, tenantId: string, userId: string, userRole: string) {
    const note = await this.findOneOrThrow(id, tenantId);
    this.assertCanModify(note, userId, userRole);

    await this.prisma.note.delete({ where: { id } });
    return { message: 'Note deleted successfully' };
  }

  private async findOneOrThrow(id: string, tenantId: string) {
    const note = await this.prisma.note.findFirst({ where: { id, tenantId } });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  private assertCanModify(note: { authorId: string }, userId: string, userRole: string) {
    if (note.authorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
      throw new ForbiddenException('You cannot modify a note created by another user');
    }
  }
}
