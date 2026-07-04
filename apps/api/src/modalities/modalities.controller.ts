import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ModalitiesService } from './modalities.service';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { CurrentTenant, JwtAuthGuard } from '@crm/auth';

@Controller('modalities')
@UseGuards(JwtAuthGuard)
export class ModalitiesController {
  constructor(private readonly modalitiesService: ModalitiesService) {}

  @Post()
  create(@Body() createModalityDto: CreateModalityDto, @CurrentTenant('id') tenantId: string) {
    return this.modalitiesService.create(createModalityDto, tenantId);
  }

  @Get()
  findAll(@CurrentTenant('id') tenantId: string) {
    return this.modalitiesService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentTenant('id') tenantId: string) {
    return this.modalitiesService.findOne(id, tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModalityDto: UpdateModalityDto, @CurrentTenant('id') tenantId: string) {
    return this.modalitiesService.update(id, updateModalityDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentTenant('id') tenantId: string) {
    return this.modalitiesService.remove(id, tenantId);
  }
}
