import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { RolePermissionsModule } from '@crm/role-permissions';
import { AutomationService } from './automation.service';
import { AutomationController } from './automation.controller';
import { AutomationProcessor } from './automation.processor';

@Module({
  imports: [RolePermissionsModule, BullModule.registerQueue({ name: 'automation' })],
  controllers: [AutomationController],
  providers: [AutomationService, AutomationProcessor],
  exports: [AutomationService],
})
export class AutomationModule {}
