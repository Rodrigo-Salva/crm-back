import { Module, OnModuleInit } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { HealthProcessor } from './health.processor';
import { WebhooksModule } from '@crm/webhooks';
import { RolePermissionsModule } from '@crm/role-permissions';
import { SharedModule } from '@crm/shared';
import { AutomationModule } from '@crm/automation';
import { AuditModule } from '@crm/audit';
import { TagsModule } from '@crm/tags';

@Module({
  imports: [
    WebhooksModule,
    RolePermissionsModule,
    SharedModule,
    AutomationModule,
    AuditModule,
    TagsModule,
    BullModule.registerQueue({ name: 'health' }),
  ],
  controllers: [LeadsController],
  providers: [LeadsService, HealthProcessor],
  exports: [LeadsService],
})
export class LeadsModule implements OnModuleInit {
  constructor(@InjectQueue('health') private readonly healthQueue: Queue) {}

  async onModuleInit() {
    await this.healthQueue.add(
      'recalculate-all',
      {},
      { repeat: { pattern: '0 3 * * *' }, jobId: 'daily-health-recalc' },
    );
  }
}
