import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { AutomationModule } from '@crm/automation';
import { AuditModule } from '@crm/audit';
import { RolePermissionsModule } from '@crm/role-permissions';

@Module({
  imports: [AutomationModule, AuditModule, RolePermissionsModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
