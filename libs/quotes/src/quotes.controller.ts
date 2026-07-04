import { Controller, Get, Post, Patch, Body, Param, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '@crm/auth';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { PermissionsGuard } from '@crm/role-permissions';

@ApiTags('Quotes')
@ApiBearerAuth()
@Controller('quotes')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class QuotesController {
  constructor(private readonly service: QuotesService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una cotización' })
  create(@Body() dto: CreateQuoteDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista cotizaciones con filtros' })
  findAll(
    @Query('search') search: string,
    @Query('status') status: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @CurrentUser() user: any,
  ) {
    const filters = { search, status, dateFrom, dateTo };
    return this.service.findAll(user.tenantId, user, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una cotización por id' })
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza una cotización en borrador' })
  update(@Param('id') id: string, @Body() dto: CreateQuoteDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.id, user.tenantId);
  }

  @Post(':id/send')
  @ApiOperation({ summary: 'Envía la cotización al cliente' })
  send(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.send(id, user.tenantId);
  }

  @Post(':id/request-approval')
  @ApiOperation({ summary: 'Solicita aprobación (ej. por descuento fuera de política)' })
  requestApproval(@Param('id') id: string, @Body('reason') reason: string, @CurrentUser() user: any) {
    return this.service.requestApproval(id, reason, user.id, user.tenantId);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Aprueba una cotización pendiente de aprobación' })
  approve(@Param('id') id: string, @Body('comment') comment: string, @CurrentUser() user: any) {
    return this.service.approve(id, user.id, comment, user.tenantId);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Rechaza una cotización pendiente de aprobación' })
  reject(@Param('id') id: string, @Body('comment') comment: string, @CurrentUser() user: any) {
    return this.service.reject(id, user.id, comment, user.tenantId);
  }

  @Post(':id/pay')
  @ApiOperation({ summary: 'Genera un checkout de Stripe para la cotización' })
  generatePayment(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.generateCheckoutSession(id, user.tenantId);
  }

  @Get(':id/pdf')
  @ApiOperation({ summary: 'Descarga la cotización en PDF' })
  async getPdf(@Param('id') id: string, @CurrentUser() user: any, @Res() res: Response) {
    const buffer = await this.service.getQuotePdf(id, user.tenantId);
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename=quote-${id}.pdf`);
    res.send(buffer);
  }
}
