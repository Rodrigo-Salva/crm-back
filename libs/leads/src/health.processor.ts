import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService } from '@crm/shared';
import { LeadsService } from './leads.service';

@Processor('health')
export class HealthProcessor extends WorkerHost {
  private readonly logger = new Logger(HealthProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly leadsService: LeadsService,
  ) {
    super();
  }

  async process(job: Job) {
    const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
    for (const tenant of tenants) {
      try {
        await this.leadsService.recalculateAllForTenant(tenant.id);
      } catch (err) {
        this.logger.error(`Health recalculation failed for tenant ${tenant.id}: ${err}`);
      }
    }
  }
}
