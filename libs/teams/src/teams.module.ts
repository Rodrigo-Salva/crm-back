import { Module } from '@nestjs/common';
import { RolePermissionsModule } from '@crm/role-permissions';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';

@Module({
  imports: [RolePermissionsModule],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
