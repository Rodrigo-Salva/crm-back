import { Controller, Get, Query, Param, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard } from '@crm/role-permissions';
import { DashboardService } from './dashboard.service';
import { ExportService } from './export.service';
import type { Response } from 'express';

@Controller('dashboard')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class DashboardController {
  constructor(
    private readonly service: DashboardService,
    private readonly exportService: ExportService,
  ) {}

  @Get('summary')
  getSummary(
    @Query('from') from: string,
    @Query('to') to: string,
    @CurrentUser() user: any,
  ) {
    return this.service.getSummary(user.tenantId, from, to);
  }

  @Get('pipeline')
  getPipeline(@CurrentUser() user: any) {
    return this.service.getPipelineStages(user.tenantId);
  }

  @Get('deals-by-stage')
  getDealsByStage(@CurrentUser() user: any) {
    return this.service.getDealsByStage(user.tenantId);
  }

  @Get('activity-by-seller')
  getActivityBySeller(
    @Query('from') from: string,
    @Query('to') to: string,
    @CurrentUser() user: any,
  ) {
    return this.service.getActivityBySeller(user.tenantId, from, to);
  }

  @Get('monthly-activity')
  getMonthlyActivity(
    @Query('months') months: string,
    @CurrentUser() user: any,
  ) {
    return this.service.getMonthlyActivity(user.tenantId, Number(months) || 6);
  }

  @Get('forecast')
  getForecast(
    @Query('months') months: string,
    @CurrentUser() user: any,
  ) {
    return this.service.getForecast(user.tenantId, Number(months) || 3);
  }

  @Get('mrr')
  getMrrArr(@CurrentUser() user: any) {
    return this.service.getMrrArr(user.tenantId);
  }

  @Get('export/:type')
  async export(
    @Param('type') type: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @CurrentUser() user: any,
    @Res() res: Response,
  ) {
    const summary = await this.service.getSummary(user.tenantId, from, to);
    const pipeline = await this.service.getPipelineStages(user.tenantId);
    const forecast = await this.service.getForecast(user.tenantId);

    if (type === 'excel') {
      const buffer = await this.exportService.toExcel(summary, pipeline, forecast);
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.set('Content-Disposition', 'attachment; filename=report.xlsx');
      res.send(buffer);
    } else if (type === 'pdf') {
      const buffer = await this.exportService.toPdf(summary, pipeline, forecast);
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', 'attachment; filename=report.pdf');
      res.send(buffer);
    } else {
      res.status(400).json({ message: 'Invalid export type. Use "excel" or "pdf".' });
    }
  }
}
