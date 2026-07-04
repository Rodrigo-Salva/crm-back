import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import * as crypto from 'crypto';

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

  async findLogs(webhookId: string, tenantId: string) {
    const webhook = await this.prisma.webhook.findFirst({ where: { id: webhookId, tenantId } });
    if (!webhook) throw new NotFoundException('Webhook not found');
    return this.prisma.webhookLog.findMany({
      where: { webhookId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
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
    const body = JSON.stringify({ event, payload, timestamp: new Date().toISOString() });
    const signatureHeaders: Record<string, string> = wh.secret
      ? {
          'X-Webhook-Secret': wh.secret,
          'X-Signature': `sha256=${crypto.createHmac('sha256', wh.secret).update(body).digest('hex')}`,
        }
      : {};

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const res = await fetch(wh.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...signatureHeaders },
          body,
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
