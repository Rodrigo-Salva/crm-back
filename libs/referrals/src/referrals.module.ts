import { Module } from '@nestjs/common';
import { SharedModule } from '@crm/shared';
import { RolePermissionsModule } from '@crm/role-permissions';
import { TenantSettingsModule } from '@crm/tenant-settings';
import { ReferralsService } from './referrals.service';
import { ReferralsController } from './referrals.controller';

@Module({
  imports: [SharedModule, RolePermissionsModule, TenantSettingsModule],
  controllers: [ReferralsController],
  providers: [ReferralsService],
  exports: [ReferralsService],
})
export class ReferralsModule {}
