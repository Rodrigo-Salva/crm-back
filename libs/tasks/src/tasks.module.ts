import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { RolePermissionsModule } from '@crm/role-permissions';
import { AutomationModule } from '@crm/automation';

@Module({
  imports: [RolePermissionsModule, AutomationModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
