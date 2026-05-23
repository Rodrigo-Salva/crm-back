import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { ImapFlow } from 'imapflow';

@Injectable()
export class ImapService {
  private readonly logger = new Logger(ImapService.name);
  private clients = new Map<string, ImapFlow>();

  constructor(private readonly prisma: PrismaService) {}

  async upsertConfig(tenantId: string, dto: { host: string; port?: number; username: string; password: string; useTLS?: boolean }) {
    const config = await this.prisma.imapConfig.upsert({
      where: { tenantId },
      create: { ...dto, tenantId },
      update: dto,
    });
    this.disconnect(tenantId);
    return config;
  }

  async getConfig(tenantId: string) {
    const config = await this.prisma.imapConfig.findUnique({ where: { tenantId } });
    if (!config) return null;
    return config;
  }

  async getClient(tenantId: string): Promise<ImapFlow | null> {
    if (this.clients.has(tenantId)) return this.clients.get(tenantId)!;

    const config = await this.getConfig(tenantId);
    if (!config) return null;

    const client = new ImapFlow({
      host: config.host,
      port: config.port,
      secure: config.useTLS,
      auth: { user: config.username, pass: config.password },
      logger: false,
    });

    this.clients.set(tenantId, client);
    return client;
  }

  disconnect(tenantId: string) {
    const client = this.clients.get(tenantId);
    if (client) {
      try { client.close(); } catch {}
      this.clients.delete(tenantId);
    }
  }

  async syncMailbox(tenantId: string): Promise<number> {
    const client = await this.getClient(tenantId);
    if (!client) return 0;

    let synced = 0;
    try {
      await client.connect();
      const lock = await client.getMailboxLock('INBOX');

      try {
        for await (const msg of client.fetch('1:*', { envelope: true, source: true, uid: true })) {
          const envelope = msg.envelope;
          if (!envelope) continue;

          const exists = await this.prisma.email.findFirst({
            where: { tenantId, messageId: envelope.messageId },
          });
          if (exists) continue;

          const from = envelope.from?.[0]?.address || '';
          const to = envelope.to?.[0]?.address || '';
          const subject = envelope.subject || '';
          const textBody = msg.source?.toString() || '';

          const contact = await this.prisma.contact.findFirst({
            where: { tenantId, email: { equals: from, mode: 'insensitive' } },
          });

          await this.prisma.email.create({
            data: {
              direction: 'inbound',
              subject,
              body: textBody.substring(0, 10000),
              fromEmail: from,
              toEmail: to,
              contactId: contact?.id,
              tenantId,
              messageId: envelope.messageId,
            },
          });

          if (contact) {
            await this.prisma.activity.create({
              data: {
                type: 'email',
                subject: `Email from ${from}: ${subject}`,
                description: textBody.substring(0, 500),
                contactId: contact.id,
                ownerId: contact.ownerId,
                tenantId,
              },
            });
          }

          synced++;
        }
      } finally {
        lock.release();
      }
    } catch (err: any) {
      this.logger.error(`IMAP sync error for ${tenantId}: ${err.message}`);
    } finally {
      try { client.close(); } catch {}
      this.clients.delete(tenantId);
    }
    return synced;
  }

  async syncAll(): Promise<number> {
    const configs = await this.prisma.imapConfig.findMany();
    let total = 0;
    for (const cfg of configs) {
      total += await this.syncMailbox(cfg.tenantId);
    }
    return total;
  }
}
