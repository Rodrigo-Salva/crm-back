import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadDto, QueryLeadDto } from './dto/create-lead.dto';

@Controller('leads')
@UseGuards(AuthGuard('jwt'))
export class LeadsController {
  constructor(private readonly service: LeadsService) {}

  @Post()
  create(@Body() dto: CreateLeadDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Get()
  findAll(@Query() query: QueryLeadDto, @CurrentUser() user: any) {
    return this.service.findAll(query, user.tenantId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }

  @Post(':id/convert')
  convert(
    @Param('id') id: string,
    @Body() dto: { contactId: string; dealTitle?: string },
    @CurrentUser() user: any,
  ) {
    return this.service.convert(id, dto.contactId, dto.dealTitle, user.id, user.tenantId);
  }

  @Post(':id/recalculate-score')
  recalculateScore(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.recalculateScore(id, user.tenantId);
  }
}
