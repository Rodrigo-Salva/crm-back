import { Module, OnModuleInit } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { GoogleCalendarTaskService } from './google-calendar-task.service';
import { CalendarSyncProcessor } from './calendar-sync.processor';
import { RolePermissionsModule } from '@crm/role-permissions';
import { AutomationModule } from '@crm/automation';

@Module({
  imports: [
    RolePermissionsModule,
    AutomationModule,
    BullModule.registerQueue({ name: 'calendar-sync' }),
  ],
  controllers: [TasksController],
  providers: [TasksService, GoogleCalendarTaskService, CalendarSyncProcessor],
  exports: [TasksService],
})
export class TasksModule implements OnModuleInit {
  constructor(@InjectQueue('calendar-sync') private readonly calendarQueue: Queue) {}

  async onModuleInit() {
    await this.calendarQueue.add(
      'pull-sync',
      {},
      { repeat: { pattern: '*/15 * * * *' }, jobId: 'calendar-pull-sync' },
    );
  }
}
