import { Injectable } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';

@Injectable()
export class ModalitiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createModalityDto: CreateModalityDto, tenantId: string) {
    return this.prisma.modality.create({
      data: {
        ...createModalityDto,
        tenantId,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.modality.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: string, tenantId: string) {
    return this.prisma.modality.findFirst({
      where: { id, tenantId },
    });
  }

  update(id: string, updateModalityDto: UpdateModalityDto, tenantId: string) {
    return this.prisma.modality.updateMany({
      where: { id, tenantId },
      data: updateModalityDto as any,
    });
  }

  remove(id: string, tenantId: string) {
    return this.prisma.modality.deleteMany({
      where: { id, tenantId },
    });
  }
}
