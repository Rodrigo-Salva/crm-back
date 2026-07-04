import { Module } from '@nestjs/common';
import { AuthModule } from '@crm/auth';
import { TenantModule } from '@crm/tenant';
import { RolePermissionsModule } from '@crm/role-permissions';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuthModule, TenantModule, RolePermissionsModule],
  controllers: [AdminController],
})
export class AdminModule {}
