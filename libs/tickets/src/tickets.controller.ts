import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '@crm/auth';
import { TicketsService } from './tickets.service';
import { CreateTicketDto, AddMessageDto, UpdateTicketDto } from './dto/create-ticket.dto';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class TicketsController {
  constructor(private readonly service: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un ticket de soporte' })
  create(@Body() dto: CreateTicketDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista tickets (filtrados por estado)' })
  findAll(@Query('status') status: string, @Query('tagId') tagId: string, @CurrentUser() user: any) {
    if (user.isPortal) {
      return this.service.findAll(user.tenantId, status, user.id);
    }
    return this.service.findAll(user.tenantId, status, undefined, tagId);
  }

  @Get('sla')
  @ApiOperation({ summary: 'Estado de cumplimiento de SLA' })
  getSla(@CurrentUser() user: any) {
    return this.service.getSlaStatus(user.tenantId);
  }

  @Get('sla-policy')
  @RequirePermission('manage_settings')
  @ApiOperation({ summary: 'Obtiene la política de SLA configurada por prioridad' })
  getSlaPolicy(@CurrentUser() user: any) {
    return this.service.getSlaPolicy(user.tenantId);
  }

  @Patch('sla-policy')
  @RequirePermission('manage_settings')
  @ApiOperation({ summary: 'Configura la política de SLA por prioridad' })
  setSlaPolicy(@Body() dto: Record<string, { responseHours: number; resolutionHours: number }>, @CurrentUser() user: any) {
    return this.service.setSlaPolicy(user.tenantId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un ticket por id' })
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    if (user.isPortal) {
      return this.service.findById(id, user.tenantId, user.id);
    }
    return this.service.findById(id, user.tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un ticket' })
  update(@Param('id') id: string, @Body() dto: UpdateTicketDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Agrega un mensaje a un ticket' })
  addMessage(@Param('id') id: string, @Body() dto: AddMessageDto, @CurrentUser() user: any) {
    return this.service.addMessage(id, dto, user.id, user.tenantId);
  }
}
