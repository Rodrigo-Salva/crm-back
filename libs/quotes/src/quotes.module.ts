import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { StripeWebhookController } from './stripe-webhook.controller';
import { RolePermissionsModule } from '@crm/role-permissions';
import { WebhooksModule } from '@crm/webhooks';
import { CommissionsModule } from '@crm/commissions';
import { ReferralsModule } from '@crm/referrals';
import { InvoicingModule } from '@crm/invoicing';

@Module({
  imports: [RolePermissionsModule, WebhooksModule, CommissionsModule, ReferralsModule, InvoicingModule],
  controllers: [QuotesController, StripeWebhookController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
