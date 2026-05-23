import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { AutomationModule } from '@crm/automation';
import { AuditModule } from '@crm/audit';
import { WebhooksModule } from '@crm/webhooks';

@Module({
  imports: [AutomationModule, AuditModule, WebhooksModule],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
