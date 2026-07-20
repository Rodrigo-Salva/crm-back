import { Controller, Get, Patch, Post, Param, Query, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { SubscriptionsService } from './subscriptions.service';
import { PermissionsGuard } from '@crm/role-permissions';

@Controller('subscriptions')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class SubscriptionsController {
  constructor(private readonly service: SubscriptionsService) {}

  @Get()
  find(@Query('contractId') contractId: string, @CurrentUser() user: any) {
    if (contractId) {
      return this.service.findByContract(contractId, user.tenantId);
    }
    return this.service.findAllSubscriptions(user.tenantId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId, user);
  }

  @Patch(':id/pause')
  pause(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.pause(id, user.tenantId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.cancel(id, user.tenantId);
  }

  @Post(':id/generate-invoice')
  generateInvoice(@Param('id') id: string, @CurrentUser() user: any) {
    if (user.isPortal) throw new ForbiddenException('Not allowed from the portal');
    return this.service.generateInvoice(id, user.tenantId);
  }
}
