import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { PrismaService } from '@crm/shared';
import { Queue } from 'bullmq';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Injectable()
export class AutomationService {
  private readonly logger = new Logger(AutomationService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('automation') private readonly automationQueue: Queue,
  ) {}

  async create(dto: CreateAutomationDto, tenantId: string) {
    return this.prisma.automation.create({
      data: {
        name: dto.name,
        tenantId,
        nodes: {
          create: {
            type: 'trigger',
            config: { event: dto.event, conditions: [] },
            positionX: 100,
            positionY: 100,
          },
        },
      },
      include: { nodes: true, connections: true },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.automation.findMany({
      where: { tenantId },
      include: { nodes: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    const automation = await this.prisma.automation.findFirst({
      where: { id, tenantId },
      include: { nodes: true, connections: true },
    });
    if (!automation) throw new NotFoundException('Automation not found');
    return automation;
  }

  async update(id: string, dto: UpdateAutomationDto, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.automation.update({ where: { id }, data: dto });
  }

  async remove(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.automation.delete({ where: { id } });
  }

  async createNode(automationId: string, dto: CreateNodeDto, tenantId: string) {
    await this.findOne(automationId, tenantId);
    return this.prisma.automationNode.create({
      data: {
        automationId,
        type: dto.type,
        actionType: dto.actionType,
        config: dto.config,
        positionX: dto.positionX,
        positionY: dto.positionY,
      },
    });
  }

  async updateNode(automationId: string, nodeId: string, dto: UpdateNodeDto, tenantId: string) {
    await this.findOne(automationId, tenantId);
    return this.prisma.automationNode.update({
      where: { id: nodeId },
      data: dto,
    });
  }

  async removeNode(automationId: string, nodeId: string, tenantId: string) {
    await this.findOne(automationId, tenantId);
    return this.prisma.automationNode.delete({ where: { id: nodeId } });
  }

  async createConnection(automationId: string, dto: CreateConnectionDto, tenantId: string) {
    await this.findOne(automationId, tenantId);
    return this.prisma.automationConnection.create({
      data: {
        automationId,
        sourceNodeId: dto.sourceNodeId,
        targetNodeId: dto.targetNodeId,
        sourceHandle: dto.sourceHandle,
      },
    });
  }

  async removeConnection(automationId: string, connectionId: string, tenantId: string) {
    await this.findOne(automationId, tenantId);
    return this.prisma.automationConnection.deleteMany({ where: { id: connectionId, automationId } });
  }

  async evaluate(event: string, payload: any, tenantId: string) {
    const triggerNodes = await this.prisma.automationNode.findMany({
      where: {
        type: 'trigger',
        automation: { tenantId, active: true },
      },
      include: { automation: true },
    });

    for (const node of triggerNodes) {
      try {
        const config = (node.config || {}) as any;
        if (config.event !== event) continue;

        const conditions = (config.conditions || []) as any[];
        const meetsConditions = conditions.every((cond: any) => this.evaluateCondition(cond, payload));
        if (!meetsConditions) continue;

        await this.automationQueue.add('run-node', {
          automationId: node.automationId,
          tenantId,
          nodeId: node.id,
          payload,
        });
      } catch (err) {
        this.logger.error(`Automation "${node.automation.name}" failed to enqueue: ${err}`);
      }
    }
  }

  evaluateCondition(condition: any, payload: any): boolean {
    const { field, operator, value } = condition;
    const actual = this.getNestedValue(payload, field);

    switch (operator) {
      case 'equals': return actual === value;
      case 'not_equals': return actual !== value;
      case 'greater_than': return Number(actual) > Number(value);
      case 'less_than': return Number(actual) < Number(value);
      case 'contains': return String(actual).includes(String(value));
      case 'in': return Array.isArray(value) && value.includes(actual);
      default: return true;
    }
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  async executeAction(node: { actionType: string | null; config: any }, payload: any, tenantId: string) {
    const config = node.config || {};

    switch (node.actionType) {
      case 'assign_round_robin':
        await this.handleRoundRobin(payload, tenantId, config);
        break;
      case 'create_task':
        await this.handleCreateTask(payload, tenantId, config);
        break;
      case 'change_stage':
        await this.handleChangeStage(payload, config);
        break;
      case 'notify':
        await this.handleNotify(payload, config);
        break;
      default:
        this.logger.warn(`Unknown action type: ${node.actionType}`);
    }
  }

  private async handleRoundRobin(payload: any, tenantId: string, config: any) {
    const role = config?.role || 'seller';
    const users = await this.prisma.user.findMany({
      where: { tenantId, role },
      orderBy: { createdAt: 'asc' },
      select: { id: true },
    });
    if (users.length === 0) return;

    const targetEntity = payload.entity;
    const targetId = payload.entityId;

    const lastAssignment = await this.prisma.auditLog.findFirst({
      where: { tenantId, entity: targetEntity, action: 'assigned' },
      orderBy: { createdAt: 'desc' },
    });

    const changes = (lastAssignment?.changes ?? {}) as any;
    const lastAssigneeId = (changes as any)?.assigneeId;
    const lastIndex = lastAssigneeId
      ? users.findIndex((u) => u.id === lastAssigneeId)
      : -1;
    const nextIndex = (lastIndex + 1) % users.length;
    const assigneeId = users[nextIndex].id;

    if (targetEntity === 'lead') {
      await this.prisma.lead.update({
        where: { id: targetId },
        data: { ownerId: assigneeId },
      });
    }

    await this.prisma.auditLog.create({
      data: {
        entity: targetEntity, entityId: targetId, action: 'assigned',
        changes: { assigneeId }, tenantId, userId: assigneeId,
      },
    });
  }

  private async handleCreateTask(payload: any, tenantId: string, config: any) {
    const leadId = payload?.id || payload?.entityId;
    if (!leadId) return;

    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
    });
    if (!lead) return;

    const title = (config?.title || 'Seguimiento: {{lead.name}}')
      .replace('{{lead.name}}', lead.name);

    await this.prisma.activity.create({
      data: {
        type: 'task',
        subject: title,
        description: config?.description || '',
        dueDate: config?.dueDate ? new Date(config.dueDate) : undefined,
        leadId,
        ownerId: lead.ownerId,
        tenantId,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity: 'lead',
        entityId: leadId,
        action: 'task_auto_created',
        tenantId,
        userId: lead.ownerId,
        changes: { title },
      },
    });
  }

  private async handleChangeStage(payload: any, config: any) {
    const leadId = payload?.id || payload?.entityId;
    if (!leadId || !config?.stage) return;
    await this.prisma.lead.update({
      where: { id: leadId },
      data: { status: config.stage },
    });
  }

  private async handleNotify(payload: any, config: any) {
    if (!config?.userId) return;
    await this.prisma.notification.create({
      data: {
        userId: config.userId,
        title: config.title || 'Notificación automática',
        body: config.body || '',
      },
    });
  }
}
