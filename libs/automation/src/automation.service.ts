import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Injectable()
export class AutomationService {
  private readonly logger = new Logger(AutomationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRuleDto, tenantId: string) {
    return this.prisma.automationRule.create({
      data: {
        name: dto.name,
        event: dto.event,
        conditions: dto.conditions || undefined,
        actions: dto.actions,
        active: dto.active ?? true,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.automationRule.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' },
    });
  }

  async update(id: string, dto: UpdateRuleDto, tenantId: string) {
    return this.prisma.automationRule.updateMany({
      where: { id, tenantId },
      data: dto as any,
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.automationRule.deleteMany({ where: { id, tenantId } });
  }

  async evaluate(event: string, payload: any, tenantId: string) {
    const rules = await this.prisma.automationRule.findMany({
      where: { tenantId, event, active: true },
      orderBy: { order: 'asc' },
    });

    for (const rule of rules) {
      try {
        const conditions = (rule.conditions || []) as any[];
        const meetsConditions = conditions.every((cond: any) =>
          this.evaluateCondition(cond, payload),
        );

        if (meetsConditions) {
          const actions = rule.actions as any[];
          for (const action of actions) {
            await this.executeAction(action, payload, tenantId);
          }
        }
      } catch (err) {
        this.logger.error(`Rule "${rule.name}" failed: ${err}`);
      }
    }
  }

  private evaluateCondition(condition: any, payload: any): boolean {
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

  private async executeAction(action: any, payload: any, tenantId: string) {
    const { type, config } = action;

    switch (type) {
      case 'assign_round_robin': {
        await this.handleRoundRobin(payload, tenantId, config);
        break;
      }
      case 'create_task': {
        await this.handleCreateTask(payload, tenantId, config);
        break;
      }
      case 'change_stage': {
        await this.handleChangeStage(payload, config);
        break;
      }
      case 'notify': {
        await this.handleNotify(payload, config);
        break;
      }
      default:
        this.logger.warn(`Unknown action type: ${type}`);
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

    if (targetEntity === 'contact') {
      await this.prisma.contact.update({
        where: { id: targetId },
        data: { ownerId: assigneeId },
      });
    } else if (targetEntity === 'deal') {
      await this.prisma.deal.update({
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
    const dealId = payload?.id || payload?.entityId;
    if (!dealId) return;

    const deal = await this.prisma.deal.findUnique({
      where: { id: dealId },
      include: { contact: { select: { name: true } } },
    });
    if (!deal) return;

    const title = (config?.title || 'Seguimiento: {{deal.title}}')
      .replace('{{deal.title}}', deal.title)
      .replace('{{contact.name}}', deal.contact?.name || '');

    await this.prisma.activity.create({
      data: {
        type: 'task',
        subject: title,
        description: config?.description || '',
        dueDate: config?.dueDate ? new Date(config.dueDate) : undefined,
        dealId,
        ownerId: deal.ownerId,
        tenantId,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity: 'deal',
        entityId: dealId,
        action: 'task_auto_created',
        tenantId,
        userId: deal.ownerId,
        changes: { title },
      },
    });
  }

  private async handleChangeStage(payload: any, config: any) {
    const dealId = payload?.id || payload?.entityId;
    if (!dealId || !config?.stage) return;
    await this.prisma.deal.update({
      where: { id: dealId },
      data: { stage: config.stage },
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
