import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeysService {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string, tenantId: string) {
    const key = `crm_${crypto.randomBytes(24).toString('hex')}`;
    return this.prisma.apiKey.create({ data: { name, key, tenantId } });
  }

  async findAll(tenantId: string) {
    return this.prisma.apiKey.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
  }

  async update(id: string, dto: { active?: boolean }, tenantId: string) {
    return this.prisma.apiKey.updateMany({ where: { id, tenantId }, data: dto });
  }

  async remove(id: string, tenantId: string) {
    const key = await this.prisma.apiKey.findFirst({ where: { id, tenantId } });
    if (!key) throw new NotFoundException('API key not found');
    return this.prisma.apiKey.delete({ where: { id } });
  }

  async validate(key: string): Promise<{ tenantId: string } | null> {
    const record = await this.prisma.apiKey.findUnique({ where: { key, active: true } });
    if (!record) return null;
    await this.prisma.apiKey.update({ where: { id: record.id }, data: { lastUsedAt: new Date() } });
    return { tenantId: record.tenantId };
  }
}
