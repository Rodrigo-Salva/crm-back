import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { RolePermissionsModule } from '@crm/role-permissions';
import { SubscriptionsModule } from '@crm/subscriptions';
import { PlaybooksModule } from '@crm/playbooks';
import { WebhooksModule } from '@crm/webhooks';

@Module({
  imports: [RolePermissionsModule, SubscriptionsModule, PlaybooksModule, WebhooksModule],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService],
})
export class ContractsModule {}
