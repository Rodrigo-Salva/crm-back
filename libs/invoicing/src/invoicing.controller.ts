import { Controller, Get, Patch, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';
import { NubefactService } from './nubefact.service';
import { InvoicingService } from './invoicing.service';
import { UpsertNubefactConfigDto } from './dto/nubefact-config.dto';

@Controller('invoicing')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class InvoicingController {
  constructor(
    private readonly nubefact: NubefactService,
    private readonly invoicing: InvoicingService,
  ) {}

  @Get('config')
  getConfig(@CurrentUser() user: any) {
    return this.nubefact.getConfig(user.tenantId);
  }

  @Patch('config')
  @RequirePermission('manage_settings')
  setConfig(@Body() dto: UpsertNubefactConfigDto, @CurrentUser() user: any) {
    return this.nubefact.setConfig(dto, user.tenantId);
  }

  @Post(':invoiceId/retry')
  retry(@Param('invoiceId') invoiceId: string, @CurrentUser() user: any) {
    return this.invoicing.retry(invoiceId, user.tenantId);
  }
}
