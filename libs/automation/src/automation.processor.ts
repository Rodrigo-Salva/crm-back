import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { PrismaService } from '@crm/shared';
import { AutomationService } from './automation.service';

interface RunNodeJobData {
  automationId: string;
  tenantId: string;
  nodeId: string;
  payload: any;
}

@Processor('automation')
export class AutomationProcessor extends WorkerHost {
  private readonly logger = new Logger(AutomationProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly automationService: AutomationService,
    @InjectQueue('automation') private readonly automationQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<RunNodeJobData>) {
    const { tenantId, nodeId, payload } = job.data;

    const node = await this.prisma.automationNode.findFirst({
      where: { id: nodeId, automation: { tenantId } },
    });
    if (!node) {
      this.logger.warn(`Node ${nodeId} not found for tenant ${tenantId}`);
      return;
    }

    if (node.type === 'action') {
      await this.automationService.executeAction(node, payload, tenantId);
    }

    let connection: { targetNodeId: string } | null;
    if (node.type === 'condition') {
      const conditions = ((node.config as any)?.conditions || []) as any[];
      const meetsConditions = conditions.every((cond) => this.automationService.evaluateCondition(cond, payload));
      connection = await this.prisma.automationConnection.findFirst({
        where: { sourceNodeId: node.id, sourceHandle: meetsConditions ? 'yes' : 'no' },
      });
    } else {
      connection = await this.prisma.automationConnection.findFirst({
        where: { sourceNodeId: node.id },
      });
    }
    if (!connection) return;

    const nextNode = await this.prisma.automationNode.findUnique({
      where: { id: connection.targetNodeId },
    });
    if (!nextNode) return;

    const delay = nextNode.type === 'wait' ? ((nextNode.config as any)?.minutes ?? 0) * 60000 : 0;

    await this.automationQueue.add(
      'run-node',
      { automationId: node.automationId, tenantId, nodeId: nextNode.id, payload },
      { delay },
    );
  }
}
