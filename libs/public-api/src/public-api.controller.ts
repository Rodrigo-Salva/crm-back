import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from '@crm/api-keys';
import { PublicApiService } from './public-api.service';
import { CreatePublicLeadDto } from './dto/create-public-lead.dto';
import { CreatePublicTicketDto } from './dto/create-public-ticket.dto';

@ApiTags('Public API')
@ApiSecurity('api-key')
@Controller('public/v1')
@UseGuards(ApiKeyGuard)
export class PublicApiController {
  constructor(private readonly service: PublicApiService) {}

  @Post('leads')
  @ApiOperation({ summary: 'Crea un lead desde un sistema externo' })
  createLead(@Body() dto: CreatePublicLeadDto, @Req() req: any) {
    return this.service.createLead(dto, req.apiKeyTenantId);
  }

  @Get('leads/:id')
  @ApiOperation({ summary: 'Consulta el estado de un lead' })
  getLead(@Param('id') id: string, @Req() req: any) {
    return this.service.getLead(id, req.apiKeyTenantId);
  }

  @Post('tickets')
  @ApiOperation({ summary: 'Crea un ticket de soporte desde un sistema externo' })
  createTicket(@Body() dto: CreatePublicTicketDto, @Req() req: any) {
    return this.service.createTicket(dto, req.apiKeyTenantId);
  }

  @Get('tickets/:id')
  @ApiOperation({ summary: 'Consulta el estado de un ticket' })
  getTicket(@Param('id') id: string, @Req() req: any) {
    return this.service.getTicket(id, req.apiKeyTenantId);
  }
}
