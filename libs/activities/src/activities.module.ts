import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService, GoogleCalendarService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
