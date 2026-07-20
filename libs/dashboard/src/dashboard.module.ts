import { Module } from '@nestjs/common';
import { RolePermissionsModule } from '@crm/role-permissions';
import { NpsModule } from '@crm/nps';
import { DashboardService } from './dashboard.service';
import { ExportService } from './export.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [RolePermissionsModule, NpsModule],
  controllers: [DashboardController],
  providers: [DashboardService, ExportService],
  exports: [DashboardService, ExportService],
})
export class DashboardModule {}
