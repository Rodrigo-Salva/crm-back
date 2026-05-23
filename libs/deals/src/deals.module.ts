import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { AutomationModule } from '@crm/automation';
import { AuditModule } from '@crm/audit';
import { WebhooksModule } from '@crm/webhooks';
import { SharedModule } from '@crm/shared';

@Module({
  imports: [AutomationModule, AuditModule, WebhooksModule, SharedModule],
  controllers: [DealsController],
  providers: [DealsService],
  exports: [DealsService],
})
export class DealsModule {}
