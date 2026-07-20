import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { AutomationModule } from '@crm/automation';
import { AuditModule } from '@crm/audit';
import { WebhooksModule } from '@crm/webhooks';
import { SharedModule } from '@crm/shared';
import { NotificationsModule } from '@crm/notifications';
import { RolePermissionsModule } from '@crm/role-permissions';
import { TagsModule } from '@crm/tags';
import { NpsModule } from '@crm/nps';

@Module({
  imports: [AutomationModule, AuditModule, WebhooksModule, SharedModule, NotificationsModule, RolePermissionsModule, TagsModule, NpsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
