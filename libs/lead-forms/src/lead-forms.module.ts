import { Module } from '@nestjs/common';
import { SharedModule } from '@crm/shared';
import { AutomationModule } from '@crm/automation';
import { RolePermissionsModule } from '@crm/role-permissions';
import { LeadFormsService } from './lead-forms.service';
import { LeadFormsController, PublicLeadFormsController } from './lead-forms.controller';

@Module({
  imports: [SharedModule, AutomationModule, RolePermissionsModule],
  controllers: [LeadFormsController, PublicLeadFormsController],
  providers: [LeadFormsService],
  exports: [LeadFormsService],
})
export class LeadFormsModule {}
