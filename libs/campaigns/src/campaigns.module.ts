import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { CampaignSendProcessor } from './campaign-send.processor';
import { EmailModule } from '@crm/email';
import { RolePermissionsModule } from '@crm/role-permissions';
import { SharedModule } from '@crm/shared';
import { NotificationsModule } from '@crm/notifications';

@Module({
  imports: [
    EmailModule,
    RolePermissionsModule,
    SharedModule,
    NotificationsModule,
    BullModule.registerQueue({ name: 'campaign-send' }),
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignSendProcessor],
  exports: [CampaignsService],
})
export class CampaignsModule {}
