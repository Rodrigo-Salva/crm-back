import { Controller, Post, Req, Res, Headers, BadRequestException } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import type { Request, Response } from 'express';
import Stripe from 'stripe';

@Controller('webhooks/stripe')
export class StripeWebhookController {
  private stripe: InstanceType<typeof Stripe>;

  constructor(private readonly quotesService: QuotesService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      apiVersion: '2025-01-27.acacia' as any,
    });
  }

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response, @Headers('stripe-signature') signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: any;

    if (webhookSecret) {
      try {
        event = this.stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err: any) {
        throw new BadRequestException(`Webhook Error: ${err.message}`);
      }
    } else {
      event = req.body;
    }

    await this.quotesService.handleStripeWebhook(event);

    res.json({ received: true });
  }
}
