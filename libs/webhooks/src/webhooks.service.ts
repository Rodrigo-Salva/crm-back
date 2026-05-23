import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: { url: string; events: string[]; secret?: string }, tenantId: string) {
    return this.prisma.webhook.create({ data: { ...dto, events: dto.events, tenantId } });
  }

  async findAll(tenantId: string) {
    return this.prisma.webhook.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
  }

  async update(id: string, dto: { url?: string; events?: string[]; secret?: string; active?: boolean }, tenantId: string) {
    return this.prisma.webhook.updateMany({ where: { id, tenantId }, data: dto });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.webhook.deleteMany({ where: { id, tenantId } });
  }

  async emit(event: string, payload: any, tenantId: string) {
    const webhooks = await this.prisma.webhook.findMany({ where: { tenantId, active: true } });
    for (const wh of webhooks) {
      const events = wh.events as string[];
      if (!events.includes(event) && !events.includes('*')) continue;
      this.sendWebhook(wh, event, payload);
    }
  }

  private async sendWebhook(wh: any, event: string, payload: any) {
    const maxRetries = 3;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const res = await fetch(wh.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(wh.secret ? { 'X-Webhook-Secret': wh.secret } : {}) },
          body: JSON.stringify({ event, payload, timestamp: new Date().toISOString() }),
        });
        await this.prisma.webhookLog.create({ data: { webhookId: wh.id, event, payload, status: res.status, response: await res.text().catch(() => ''), retries: attempt } });
        return;
      } catch (err: any) {
        this.logger.warn(`Webhook ${wh.id} attempt ${attempt + 1} failed: ${err.message}`);
        if (attempt === maxRetries - 1) {
          await this.prisma.webhookLog.create({ data: { webhookId: wh.id, event, payload, status: 0, response: err.message, retries: attempt + 1 } });
        }
      }
    }
  }
}
