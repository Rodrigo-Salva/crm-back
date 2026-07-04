import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { SubscriptionsService } from './subscriptions.service';
import { PermissionsGuard } from '@crm/role-permissions';

@Controller('invoices')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class InvoicesController {
  constructor(private readonly service: SubscriptionsService) {}

  @Get()
  findAll(@Query('subscriptionId') subscriptionId: string, @CurrentUser() user: any) {
    if (subscriptionId) {
      return this.service.findInvoicesBySubscription(subscriptionId, user.tenantId);
    }
    if (user.isPortal) {
      return this.service.findInvoicesForLead(user.id, user.tenantId);
    }
    return [];
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findInvoiceById(id, user.tenantId, user);
  }

  @Post(':id/send')
  send(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.sendInvoice(id, user.tenantId);
  }
}
