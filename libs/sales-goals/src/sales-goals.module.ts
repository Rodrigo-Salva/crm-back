import { Module } from '@nestjs/common';
import { SharedModule } from '@crm/shared';
import { RolePermissionsModule } from '@crm/role-permissions';
import { SalesGoalsService } from './sales-goals.service';
import { SalesGoalsController } from './sales-goals.controller';

@Module({
  imports: [SharedModule, RolePermissionsModule],
  controllers: [SalesGoalsController],
  providers: [SalesGoalsService],
  exports: [SalesGoalsService],
})
export class SalesGoalsModule {}
