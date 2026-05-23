import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { EmailModule } from '@crm/email';
import { NotificationsModule } from '@crm/notifications';

@Module({
  imports: [EmailModule, NotificationsModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
