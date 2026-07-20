import { Module } from '@nestjs/common';
import { SharedModule } from '@crm/shared';
import { RolePermissionsModule } from '@crm/role-permissions';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [SharedModule, RolePermissionsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
