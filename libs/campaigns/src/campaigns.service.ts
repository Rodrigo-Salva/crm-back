import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { EmailService } from '@crm/email';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  private readonly logger = new Logger(CampaignsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateCampaignDto, tenantId: string) {
    const body = dto.templateId
      ? (await this.prisma.emailTemplate.findUnique({ where: { id: dto.templateId } }))?.body || dto.body
      : dto.body;

    const campaign = await this.prisma.campaign.create({
      data: {
        name: dto.name,
        subject: dto.subject,
        body,
        templateId: dto.templateId,
        tenantId,
        status: 'draft',
        totalRecipients: dto.contactIds.length,
        recipients: {
          create: dto.contactIds.map((contactId) => ({
            contactId,
            email: '',
          })),
        },
      },
      include: { recipients: true },
    });

    const contacts = await this.prisma.contact.findMany({
      where: { id: { in: dto.contactIds }, tenantId },
      select: { id: true, email: true },
    });

    const emailMap = new Map(contacts.map((c) => [c.id, c.email]));
    for (const recipient of campaign.recipients) {
      const email = emailMap.get(recipient.contactId);
      if (email) {
        await this.prisma.campaignRecipient.update({
          where: { id: recipient.id },
          data: { email },
        });
      }
    }

    return campaign;
  }

  async findAll(tenantId: string) {
    return this.prisma.campaign.findMany({
      where: { tenantId },
      include: { _count: { select: { recipients: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
      include: {
        recipients: {
          include: { contact: { select: { id: true, name: true, email: true } } },
        },
      },
    });
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  async send(id: string, tenantId: string) {
    const campaign = await this.findById(id, tenantId);
    if (campaign.status !== 'draft') throw new BadRequestException('Campaign already sent or sending');

    await this.prisma.campaign.update({ where: { id }, data: { status: 'sending' } });

    let sent = 0;
    for (const recipient of campaign.recipients) {
      try {
        await this.emailService.sendEmail(
          { to: recipient.email, subject: campaign.subject, body: campaign.body },
          tenantId,
        );
        await this.prisma.campaignRecipient.update({
          where: { id: recipient.id },
          data: { sent: true, sentAt: new Date() },
        });
        sent++;
      } catch (err: any) {
        this.logger.error(`Campaign send error for ${recipient.email}: ${err.message}`);
        await this.prisma.campaignRecipient.update({
          where: { id: recipient.id },
          data: { error: err.message },
        });
      }
    }

    await this.prisma.campaign.update({
      where: { id },
      data: { status: 'sent', sentCount: sent, sentAt: new Date() },
    });

    return { message: 'Campaign sent', sent, total: campaign.recipients.length };
  }

  async getStats(id: string, tenantId: string) {
    const campaign = await this.findById(id, tenantId);
    const opened = campaign.recipients.filter((r) => r.opened).length;
    return {
      total: campaign.recipients.length,
      sent: campaign.recipients.filter((r) => r.sent).length,
      opened,
      openRate: campaign.recipients.length ? ((opened / campaign.recipients.length) * 100).toFixed(1) : '0',
    };
  }
}
