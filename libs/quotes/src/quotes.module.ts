import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { StripeWebhookController } from './stripe-webhook.controller';
import { RolePermissionsModule } from '@crm/role-permissions';
import { WebhooksModule } from '@crm/webhooks';

@Module({
  imports: [RolePermissionsModule, WebhooksModule],
  controllers: [QuotesController, StripeWebhookController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
