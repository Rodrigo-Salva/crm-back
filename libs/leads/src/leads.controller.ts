import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '@crm/auth';
import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadDto, QueryLeadDto } from './dto/create-lead.dto';
import { PermissionsGuard } from '@crm/role-permissions';

@ApiTags('Leads')
@ApiBearerAuth()
@Controller('leads')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class LeadsController {
  constructor(private readonly service: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un lead' })
  create(@Body() dto: CreateLeadDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista leads con filtros y paginación' })
  findAll(@Query() query: QueryLeadDto, @CurrentUser() user: any) {
    return this.service.findAll(query, user);
  }

  @Get('pipeline')
  @ApiOperation({ summary: 'Resumen del pipeline de ventas' })
  getPipeline(@CurrentUser() user: any) {
    return this.service.getPipeline(user);
  }

  @Get('duplicates')
  @ApiOperation({ summary: 'Detecta leads potencialmente duplicados' })
  findDuplicates(@CurrentUser() user: any) {
    return this.service.findDuplicates(user.tenantId);
  }

  @Post('merge')
  @ApiOperation({ summary: 'Fusiona leads duplicados en uno solo' })
  merge(@Body() dto: { primaryId: string; duplicateIds: string[] }, @CurrentUser() user: any) {
    return this.service.merge(dto.primaryId, dto.duplicateIds, user.id, user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un lead por id' })
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un lead' })
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un lead' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user);
  }

  @Post(':id/recalculate-score')
  @ApiOperation({ summary: 'Recalcula el score de ventas del lead' })
  recalculateScore(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.recalculateScore(id, user);
  }

  @Post(':id/recalculate-health')
  @ApiOperation({ summary: 'Recalcula el health score de retención del lead' })
  recalculateHealth(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.recalculateHealth(id, user);
  }
}
