import { Module } from '@nestjs/common';
import { SharedModule } from '@crm/shared';
import { RolePermissionsModule } from '@crm/role-permissions';
import { NubefactService } from './nubefact.service';
import { InvoicingService } from './invoicing.service';
import { InvoicingController } from './invoicing.controller';

@Module({
  imports: [SharedModule, RolePermissionsModule],
  controllers: [InvoicingController],
  providers: [NubefactService, InvoicingService],
  exports: [InvoicingService, NubefactService],
})
export class InvoicingModule {}
