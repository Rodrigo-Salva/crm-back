import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.tag.findMany({ where: { tenantId }, orderBy: { name: 'asc' } });
  }

  async attach(entity: string, entityId: string, tagName: string, tenantId: string) {
    const name = tagName.trim().toLowerCase();
    if (!name) throw new NotFoundException('Nombre de tag inválido');

    const tag = await this.prisma.tag.upsert({
      where: { name_tenantId: { name, tenantId } },
      create: { name, tenantId },
      update: {},
    });

    const existing = await this.prisma.entityTag.findFirst({
      where: { tagId: tag.id, entity, entityId, tenantId },
    });
    if (existing) return { ...existing, tag };

    const entityTag = await this.prisma.entityTag.create({
      data: { tagId: tag.id, entity, entityId, tenantId },
    });
    return { ...entityTag, tag };
  }

  async detach(entityTagId: string, tenantId: string) {
    const link = await this.prisma.entityTag.findFirst({ where: { id: entityTagId, tenantId } });
    if (!link) throw new NotFoundException('Etiqueta no encontrada en este registro');
    return this.prisma.entityTag.delete({ where: { id: entityTagId } });
  }

  async findForEntity(entity: string, entityId: string, tenantId: string) {
    return this.prisma.entityTag.findMany({
      where: { entity, entityId, tenantId },
      include: { tag: true },
    });
  }

  async removeTag(tagId: string, tenantId: string) {
    const tag = await this.prisma.tag.findFirst({ where: { id: tagId, tenantId } });
    if (!tag) throw new NotFoundException('Tag no encontrado');
    return this.prisma.tag.delete({ where: { id: tagId } });
  }

  async entityIdsForTag(entity: string, tagId: string, tenantId: string) {
    const links = await this.prisma.entityTag.findMany({
      where: { entity, tagId, tenantId },
      select: { entityId: true },
    });
    return links.map((l) => l.entityId);
  }
}
