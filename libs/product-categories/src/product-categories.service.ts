import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto/create-category.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductCategoryDto, tenantId: string) {
    return this.prisma.productCategory.create({
      data: { ...dto, tenantId },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.productCategory.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string, tenantId: string) {
    const category = await this.prisma.productCategory.findFirst({
      where: { id, tenantId },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, dto: UpdateProductCategoryDto, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.productCategory.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.productCategory.delete({
      where: { id },
    });
  }
}
