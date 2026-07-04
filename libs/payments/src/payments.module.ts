import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SharedModule } from '@crm/shared';
import { RolePermissionsModule } from '@crm/role-permissions';
import { WebhooksModule } from '@crm/webhooks';

@Module({
  imports: [SharedModule, RolePermissionsModule, WebhooksModule],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService],
})
export class PaymentsModule {}
