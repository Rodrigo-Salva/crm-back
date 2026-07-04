import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard, RequirePermission } from '@crm/role-permissions';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.usersService.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.usersService.findById(id, user.tenantId);
  }

  @Post()
  @RequirePermission('manage_users')
  create(@Body() dto: CreateUserDto, @CurrentUser() user: any) {
    return this.usersService.create(dto, user.tenantId);
  }

  @Patch(':id')
  @RequirePermission('manage_users')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @CurrentUser() user: any) {
    return this.usersService.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  @RequirePermission('manage_users')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.usersService.remove(id, user.tenantId, user.id);
  }
}
