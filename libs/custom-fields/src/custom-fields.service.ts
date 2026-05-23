import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';

@Injectable()
export class CustomFieldsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCustomFieldDto, tenantId: string) {
    const existing = await this.prisma.customFieldDefinition.findUnique({
      where: { name_entity_tenantId: { name: dto.name, entity: dto.entity, tenantId } },
    });
    if (existing) throw new ConflictException('Field already exists for this entity');

    const count = await this.prisma.customFieldDefinition.count({
      where: { entity: dto.entity, tenantId },
    });
    if (count >= 5) throw new ConflictException('Maximum 5 custom fields per entity');

    return this.prisma.customFieldDefinition.create({
      data: { ...dto, options: dto.options || undefined, tenantId },
    });
  }

  async findAll(entity?: string, tenantId?: string) {
    const where: any = {};
    if (entity) where.entity = entity;
    if (tenantId) where.tenantId = tenantId;
    return this.prisma.customFieldDefinition.findMany({
      where,
      orderBy: [{ entity: 'asc' }, { order: 'asc' }],
    });
  }

  async update(id: string, dto: UpdateCustomFieldDto, tenantId: string) {
    const field = await this.prisma.customFieldDefinition.findFirst({ where: { id, tenantId } });
    if (!field) throw new NotFoundException('Custom field not found');
    return this.prisma.customFieldDefinition.update({ where: { id }, data: dto });
  }

  async remove(id: string, tenantId: string) {
    const field = await this.prisma.customFieldDefinition.findFirst({ where: { id, tenantId } });
    if (!field) throw new NotFoundException('Custom field not found');
    return this.prisma.customFieldDefinition.delete({ where: { id } });
  }
}
