import { Module } from '@nestjs/common';
import { SharedModule } from '@crm/shared';
import { RolePermissionsModule } from '@crm/role-permissions';
import { MarketingCampaignsService } from './marketing-campaigns.service';
import { MarketingCampaignsController } from './marketing-campaigns.controller';

@Module({
  imports: [SharedModule, RolePermissionsModule],
  controllers: [MarketingCampaignsController],
  providers: [MarketingCampaignsService],
  exports: [MarketingCampaignsService],
})
export class MarketingCampaignsModule {}
