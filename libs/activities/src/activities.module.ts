import { Module } from '@nestjs/common';
import { RolePermissionsModule } from '@crm/role-permissions';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
  imports: [RolePermissionsModule],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, GoogleCalendarService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
