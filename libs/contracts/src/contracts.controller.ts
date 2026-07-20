import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '@crm/auth';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { PermissionsGuard } from '@crm/role-permissions';

@ApiTags('Contracts')
@ApiBearerAuth()
@Controller('contracts')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ContractsController {
  constructor(private readonly service: ContractsService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un contrato (y su suscripción) a partir de una cotización aprobada/convertida' })
  create(@Body() dto: CreateContractDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista contratos' })
  findAll(@Query('leadId') leadId: string, @Query('companyId') companyId: string, @CurrentUser() user: any) {
    return this.service.findAll(user.tenantId, user, { leadId, companyId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un contrato por id' })
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId, user);
  }

  @Post(':id/send')
  @ApiOperation({ summary: 'Envía el contrato al cliente para su aceptación' })
  send(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.send(id, user.tenantId);
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'El cliente acepta el contrato desde el portal' })
  accept(@Param('id') id: string, @CurrentUser() user: any, @Req() req: Request) {
    return this.service.accept(id, user, req.ip);
  }
}
