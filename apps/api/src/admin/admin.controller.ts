import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TenantService } from '@crm/tenant';
import { RolesGuard, Roles, CurrentUser } from '@crm/auth';
import { RolePermissionsService } from '@crm/role-permissions';
import { CreateTenantDto } from '@crm/tenant/dto/create-tenant.dto';
import { UpdateTenantDto } from '@crm/tenant/dto/update-tenant.dto';

@Controller('admin/tenants')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
  constructor(
    private readonly tenantService: TenantService,
    private readonly rolePermissions: RolePermissionsService,
  ) {}

  @Get()
  @Roles('superadmin')
  findAll() {
    return this.tenantService.findAll();
  }

  @Post()
  @Roles('superadmin')
  async create(@Body() dto: CreateTenantDto) {
    const tenant = await this.tenantService.create(dto);
    await this.rolePermissions.seedDefaultsForTenant(tenant.id);
    return tenant;
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

  @Delete(':id')
  @Roles('superadmin')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
