import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: any, tenantId: string) {
    return this.prisma.product.create({ data: { ...dto, tenantId } });
  }

  async findAll(tenantId: string, category?: string) {
    const where: any = { tenantId };
    if (category) where.category = category;
    return this.prisma.product.findMany({ where, orderBy: { name: 'asc' } });
  }

  async findById(id: string, tenantId: string) {
    const product = await this.prisma.product.findFirst({ where: { id, tenantId } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: any, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.product.delete({ where: { id } });
  }

  async getCategories(tenantId: string) {
    const products = await this.prisma.product.findMany({
      where: { tenantId, category: { not: null } },
      select: { category: true },
      distinct: ['category'],
    });
    return products.map((p) => p.category).filter(Boolean);
  }

  async createPriceList(dto: any, tenantId: string) {
    const { items, ...data } = dto;
    return this.prisma.priceList.create({
      data: {
        ...data,
        tenantId,
        items: items ? { create: items } : undefined,
      },
      include: { items: { include: { product: true } } },
    });
  }

  async getPriceLists(tenantId: string) {
    return this.prisma.priceList.findMany({
      where: { tenantId },
      include: { items: { include: { product: { select: { id: true, name: true, price: true } } } } },
    });
  }

  async createDiscount(dto: any, tenantId: string) {
    return this.prisma.discount.create({ data: { ...dto, tenantId } });
  }

  async getDiscounts(tenantId: string) {
    return this.prisma.discount.findMany({ where: { tenantId }, orderBy: { name: 'asc' } });
  }

  async calculatePrice(productId: string, quantity: number, tenantId: string): Promise<{ unitPrice: number; discountPercent: number; total: number }> {
    const product = await this.findById(productId, tenantId);
    let unitPrice = product.price;
    let discountPercent = 0;

    const discount = await this.prisma.discount.findFirst({
      where: { tenantId, productId, active: true, minQuantity: { lte: quantity } },
      orderBy: { percentage: 'desc' },
    });

    if (discount) discountPercent = discount.percentage;

    const total = unitPrice * quantity * (1 - discountPercent / 100);
    return { unitPrice, discountPercent, total: Math.round(total * 100) / 100 };
  }
}
