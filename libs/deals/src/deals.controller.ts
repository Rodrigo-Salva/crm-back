import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { QueryDealDto } from './dto/query-deal.dto';
import { CurrentUser } from '@crm/auth';

@Controller('deals')
@UseGuards(AuthGuard('jwt'))
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  create(@Body() dto: CreateDealDto, @CurrentUser() user: any) {
    return this.dealsService.create(dto, user.id, user.tenantId);
  }

  @Get()
  findAll(@Query() query: QueryDealDto, @CurrentUser() user: any) {
    return this.dealsService.findAll(query, user.tenantId);
  }

  @Get('pipeline')
  getPipeline(@CurrentUser() user: any) {
    return this.dealsService.getPipeline(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.dealsService.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDealDto, @CurrentUser() user: any) {
    return this.dealsService.update(id, dto, user.tenantId);
  }

  @Patch(':id/stage')
  updateStage(@Param('id') id: string, @Body('stage') stage: string, @CurrentUser() user: any) {
    return this.dealsService.updateStage(id, stage, user.tenantId);
  }

  @Post(':id/convert')
  convertFromLead(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    return this.dealsService.convertFromLead(id, dto, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.dealsService.remove(id, user.tenantId);
  }
}
