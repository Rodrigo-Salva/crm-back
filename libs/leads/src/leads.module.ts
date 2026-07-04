import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { WebhooksModule } from '@crm/webhooks';
import { RolePermissionsModule } from '@crm/role-permissions';
import { SharedModule } from '@crm/shared';
import { AutomationModule } from '@crm/automation';
import { AuditModule } from '@crm/audit';

@Module({
  imports: [WebhooksModule, RolePermissionsModule, SharedModule, AutomationModule, AuditModule],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
