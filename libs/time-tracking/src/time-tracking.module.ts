import { Module } from '@nestjs/common';
import { RolePermissionsModule } from '@crm/role-permissions';
import { TimeTrackingService } from './time-tracking.service';
import { TimeTrackingController } from './time-tracking.controller';

@Module({
  imports: [RolePermissionsModule],
  controllers: [TimeTrackingController],
  providers: [TimeTrackingService],
  exports: [TimeTrackingService],
})
export class TimeTrackingModule {}
