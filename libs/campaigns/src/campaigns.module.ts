import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { EmailModule } from '@crm/email';
import { RolePermissionsModule } from '@crm/role-permissions';

@Module({
  imports: [EmailModule, RolePermissionsModule],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [CampaignsService],
})
export class CampaignsModule {}
