import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { InvoicesController } from './invoices.controller';
import { RolePermissionsModule } from '@crm/role-permissions';
import { NotificationsModule } from '@crm/notifications';

@Module({
  imports: [RolePermissionsModule, NotificationsModule],
  controllers: [SubscriptionsController, InvoicesController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
