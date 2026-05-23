import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TenantService } from '@crm/tenant';
import { RolesGuard, Roles, CurrentUser } from '@crm/auth';
import { CreateTenantDto } from '@crm/tenant/dto/create-tenant.dto';
import { UpdateTenantDto } from '@crm/tenant/dto/update-tenant.dto';

@Controller('admin/tenants')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  @Roles('superadmin')
  findAll() {
    return this.tenantService.findAll();
  }

  @Post()
  @Roles('superadmin')
  create(@Body() dto: CreateTenantDto) {
    return this.tenantService.create(dto);
  }

  @Get(':id')
  @Roles('superadmin')
  findOne(@Param('id') id: string) {
    return this.tenantService.findById(id);
  }

  @Patch(':id')
  @Roles('superadmin')
  update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.tenantService.update(id, dto);
  }
}
