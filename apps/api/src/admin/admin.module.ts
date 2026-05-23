import { Module } from '@nestjs/common';
import { AuthModule } from '@crm/auth';
import { TenantModule } from '@crm/tenant';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuthModule, TenantModule],
  controllers: [AdminController],
})
export class AdminModule {}
