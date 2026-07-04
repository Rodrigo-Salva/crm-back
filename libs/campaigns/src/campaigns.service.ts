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
        totalRecipients: dto.leadIds.length,
        recipients: {
          create: dto.leadIds.map((leadId) => ({
            leadId,
            email: '',
          })),
        },
      },
      include: { recipients: true },
    });

    const leads = await this.prisma.lead.findMany({
      where: { id: { in: dto.leadIds }, tenantId },
      select: { id: true, email: true },
    });

    const emailMap = new Map(leads.map((l) => [l.id, l.email]));
    for (const recipient of campaign.recipients) {
      const email = emailMap.get(recipient.leadId);
      if (email) {
        await this.prisma.campaignRecipient.update({
          where: { id: recipient.id },
          data: { email },
        });
      }
    }

    return campaign;
  }

  async findAll(tenantId: string, search?: string) {
    const where: any = { tenantId };
    if (search) where.name = { contains: search, mode: 'insensitive' };
    return this.prisma.campaign.findMany({
      where,
      include: { _count: { select: { recipients: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, tenantId },
      include: {
        recipients: {
          include: { lead: { select: { id: true, name: true, email: true } } },
        },
      },
    });
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  async update(
    id: string,
    dto: { name?: string; subject?: string; body?: string; leadIds?: string[] },
    tenantId: string,
  ) {
    const campaign = await this.findById(id, tenantId);
    if (campaign.status !== 'draft') throw new BadRequestException('Only draft campaigns can be edited');

    const { leadIds, ...rest } = dto;

    if (leadIds) {
      const currentIds = campaign.recipients.map((r) => r.leadId);
      const toRemove = currentIds.filter((lid) => !leadIds.includes(lid));
      const toAdd = leadIds.filter((lid) => !currentIds.includes(lid));

      if (toRemove.length) {
        await this.prisma.campaignRecipient.deleteMany({
          where: { campaignId: id, leadId: { in: toRemove } },
        });
      }
      if (toAdd.length) {
        const leads = await this.prisma.lead.findMany({
          where: { id: { in: toAdd }, tenantId },
          select: { id: true, email: true },
        });
        await this.prisma.campaignRecipient.createMany({
          data: leads.map((l) => ({ campaignId: id, leadId: l.id, email: l.email || '' })),
        });
      }

      await this.prisma.campaign.update({
        where: { id },
        data: { totalRecipients: leadIds.length },
      });
    }

    return this.prisma.campaign.update({ where: { id }, data: rest });
  }

  async remove(id: string, tenantId: string) {
    const campaign = await this.findById(id, tenantId);
    if (campaign.status === 'sending') throw new BadRequestException('Cannot delete a campaign while sending');
    await this.prisma.campaignRecipient.deleteMany({ where: { campaignId: id } });
    return this.prisma.campaign.delete({ where: { id } });
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
