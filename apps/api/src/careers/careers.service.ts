import { Injectable } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@Injectable()
export class CareersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCareerDto: CreateCareerDto, tenantId: string) {
    return this.prisma.career.create({
      data: {
        ...createCareerDto,
        tenantId,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.career.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: string, tenantId: string) {
    return this.prisma.career.findFirst({
      where: { id, tenantId },
    });
  }

  update(id: string, updateCareerDto: UpdateCareerDto, tenantId: string) {
    return this.prisma.career.updateMany({
      where: { id, tenantId },
      data: updateCareerDto as any,
    });
  }

  remove(id: string, tenantId: string) {
    return this.prisma.career.deleteMany({
      where: { id, tenantId },
    });
  }
}
