import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { AutomationModule } from '@crm/automation';
import { AuditModule } from '@crm/audit';
import { WebhooksModule } from '@crm/webhooks';
import { SharedModule } from '@crm/shared';
import { NotificationsModule } from '@crm/notifications';
import { RolePermissionsModule } from '@crm/role-permissions';

@Module({
  imports: [AutomationModule, AuditModule, WebhooksModule, SharedModule, NotificationsModule, RolePermissionsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
