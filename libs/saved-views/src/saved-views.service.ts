import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreateSavedViewDto } from './dto/create-saved-view.dto';

@Injectable()
export class SavedViewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(entity: string, userId: string, tenantId: string) {
    return this.prisma.savedView.findMany({
      where: { entity, userId, tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateSavedViewDto, userId: string, tenantId: string) {
    return this.prisma.savedView.upsert({
      where: { userId_entity_name: { userId, entity: dto.entity, name: dto.name } },
      create: { entity: dto.entity, name: dto.name, filters: dto.filters, userId, tenantId },
      update: { filters: dto.filters },
    });
  }

  async remove(id: string, userId: string, tenantId: string) {
    const view = await this.prisma.savedView.findFirst({ where: { id, userId, tenantId } });
    if (!view) throw new NotFoundException('Vista no encontrada');
    return this.prisma.savedView.delete({ where: { id } });
  }
}
