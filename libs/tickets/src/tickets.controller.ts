import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { TicketsService } from './tickets.service';
import { CreateTicketDto, AddMessageDto } from './dto/create-ticket.dto';

@Controller('tickets')
@UseGuards(AuthGuard('jwt'))
export class TicketsController {
  constructor(private readonly service: TicketsService) {}

  @Post()
  create(@Body() dto: CreateTicketDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get()
  findAll(@Query('status') status: string, @CurrentUser() user: any) {
    if (user.isPortal) {
      return this.service.findAll(user.tenantId, status, user.id);
    }
    return this.service.findAll(user.tenantId, status);
  }

  @Get('sla')
  getSla(@CurrentUser() user: any) {
    return this.service.getSlaStatus(user.tenantId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    if (user.isPortal) {
      return this.service.findById(id, user.tenantId, user.id);
    }
    return this.service.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Post(':id/messages')
  addMessage(@Param('id') id: string, @Body() dto: AddMessageDto, @CurrentUser() user: any) {
    return this.service.addMessage(id, dto, user.id, user.tenantId);
  }
}
