import { Module } from '@nestjs/common';
import { RolePermissionsModule } from '@crm/role-permissions';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [RolePermissionsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
