import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { EmailModule } from '@crm/email';
import { NotificationsModule } from '@crm/notifications';
import { SubscriptionsModule } from '@crm/subscriptions';
import { PlaybooksModule } from '@crm/playbooks';
import { LeadsModule } from '@crm/leads';

@Module({
  imports: [EmailModule, NotificationsModule, SubscriptionsModule, PlaybooksModule, LeadsModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
