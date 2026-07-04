import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionsController } from './role-permissions.controller';
import { PermissionsGuard } from './permissions.guard';

@Module({
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService, PermissionsGuard],
  exports: [RolePermissionsService, PermissionsGuard],
})
export class RolePermissionsModule {}
