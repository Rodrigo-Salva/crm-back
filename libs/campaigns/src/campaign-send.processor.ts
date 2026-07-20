import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService, RealtimeGateway } from '@crm/shared';
import { EmailService } from '@crm/email';
import { NotificationsService } from '@crm/notifications';

interface CampaignSendJobData {
  campaignId: string;
  tenantId: string;
}

@Processor('campaign-send')
export class CampaignSendProcessor extends WorkerHost {
  private readonly logger = new Logger(CampaignSendProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly notifications: NotificationsService,
    private readonly realtime: RealtimeGateway,
  ) {
    super();
  }

  async process(job: Job<CampaignSendJobData>) {
    const { campaignId, tenantId } = job.data;

    const campaign = await this.prisma.campaign.findFirst({
      where: { id: campaignId, tenantId },
      include: { recipients: true },
    });
    if (!campaign) {
      this.logger.warn(`Campaign ${campaignId} not found for tenant ${tenantId}`);
      return;
    }

    let sent = 0;
    for (const recipient of campaign.recipients) {
      try {
        const { trackingId } = await this.emailService.sendEmail(
          { to: recipient.email, subject: campaign.subject, body: campaign.body },
          tenantId,
        );
        await this.prisma.campaignRecipient.update({
          where: { id: recipient.id },
          data: { sent: true, sentAt: new Date(), trackingId },
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
      where: { id: campaignId },
      data: { status: 'sent', sentCount: sent, sentAt: new Date() },
    });

    if (campaign.createdById) {
      const notification = await this.notifications.create({
        userId: campaign.createdById,
        title: 'Campaña enviada',
        body: `Se enviaron ${sent} de ${campaign.recipients.length} correos de "${campaign.name}".`,
        link: `/campaigns/${campaignId}`,
      });
      this.realtime.notifyUser(campaign.createdById, 'notification:new', notification);
    }
  }
}
