import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  constructor(private readonly prisma: PrismaService) {}

  async upsertConfig(dto: { phoneNumberId: string; accessToken: string; businessId: string }, tenantId: string) {
    return this.prisma.whatsappConfig.upsert({
      where: { tenantId },
      create: { ...dto, tenantId },
      update: dto,
    });
  }

  async getConfig(tenantId: string) {
    return this.prisma.whatsappConfig.findUnique({ where: { tenantId } });
  }

  async sendTemplate(tenantId: string, to: string, templateName: string, params: Record<string, string> = {}) {
    const config = await this.getConfig(tenantId);
    if (!config) throw new NotFoundException('WhatsApp not configured');

    const body = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'es' },
        components: Object.keys(params).length > 0
          ? [{ type: 'body', parameters: Object.entries(params).map(([k, v]) => ({ type: 'text', text: v })) }]
          : undefined,
      },
    };

    try {
      const res = await fetch(`https://graph.facebook.com/v21.0/${config.phoneNumberId}/messages`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${config.accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'WhatsApp API error');
      return data;
    } catch (err: any) {
      this.logger.error(`WhatsApp send error: ${err.message}`);
      throw err;
    }
  }
}
