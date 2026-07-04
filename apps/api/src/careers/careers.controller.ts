import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { CurrentTenant, JwtAuthGuard } from '@crm/auth';

@Controller('careers')
@UseGuards(JwtAuthGuard)
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Post()
  create(@Body() createCareerDto: CreateCareerDto, @CurrentTenant('id') tenantId: string) {
    return this.careersService.create(createCareerDto, tenantId);
  }

  @Get()
  findAll(@CurrentTenant('id') tenantId: string) {
    return this.careersService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentTenant('id') tenantId: string) {
    return this.careersService.findOne(id, tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCareerDto: UpdateCareerDto, @CurrentTenant('id') tenantId: string) {
    return this.careersService.update(id, updateCareerDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentTenant('id') tenantId: string) {
    return this.careersService.remove(id, tenantId);
  }
}
