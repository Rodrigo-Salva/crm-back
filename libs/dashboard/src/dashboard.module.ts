import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ExportService } from './export.service';
import { DashboardController } from './dashboard.controller';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, ExportService],
  exports: [DashboardService, ExportService],
})
export class DashboardModule {}
