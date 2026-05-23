import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { StripeWebhookController } from './stripe-webhook.controller';

@Module({
  controllers: [QuotesController, StripeWebhookController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
