import { Injectable } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class TenantSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(tenantId: string) {
    const settings = await this.prisma.tenantSetting.findMany({ where: { tenantId } });
    const result: Record<string, string> = {};
    for (const s of settings) result[s.key] = s.value;
    return result;
  }

  async set(key: string, value: string, tenantId: string) {
    return this.prisma.tenantSetting.upsert({
      where: { key_tenantId: { key, tenantId } },
      create: { key, value, tenantId },
      update: { value },
    });
  }

  async setBulk(settings: Record<string, string>, tenantId: string) {
    for (const [key, value] of Object.entries(settings)) {
      await this.set(key, value, tenantId);
    }
    return this.get(tenantId);
  }
}
