import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { QueryCompanyDto } from './dto/query-company.dto';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard } from '@crm/role-permissions';

@Controller('companies')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto, @CurrentUser() user: any) {
    return this.companiesService.create(dto, user.id, user.tenantId);
  }

  @Get()
  findAll(@Query() query: QueryCompanyDto, @CurrentUser() user: any) {
    return this.companiesService.findAll(query, user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.companiesService.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto, @CurrentUser() user: any) {
    return this.companiesService.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.companiesService.remove(id, user.tenantId);
  }
}
