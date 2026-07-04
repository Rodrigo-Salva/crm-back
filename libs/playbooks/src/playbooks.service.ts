import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { PlaybookTrigger } from '@prisma/client';
import { CreatePlaybookDto } from './dto/create-playbook.dto';
import { UpdatePlaybookDto } from './dto/update-playbook.dto';

@Injectable()
export class PlaybooksService {
  private readonly logger = new Logger(PlaybooksService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlaybookDto, tenantId: string) {
    return this.prisma.playbook.create({
      data: {
        name: dto.name,
        trigger: dto.trigger,
        active: dto.active ?? true,
        tenantId,
        steps: {
          create: dto.steps.map((s) => ({
            title: s.title,
            description: s.description,
            dayOffset: s.dayOffset,
            order: s.order ?? 0,
          })),
        },
      },
      include: { steps: { orderBy: { order: 'asc' } } },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.playbook.findMany({
      where: { tenantId },
      include: { steps: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    const playbook = await this.prisma.playbook.findFirst({
      where: { id, tenantId },
      include: { steps: { orderBy: { order: 'asc' } } },
    });
    if (!playbook) throw new NotFoundException('Playbook not found');
    return playbook;
  }

  async update(id: string, dto: UpdatePlaybookDto, tenantId: string) {
    await this.findOne(id, tenantId);

    return this.prisma.$transaction(async (tx) => {
      if (dto.steps) {
        await tx.playbookStep.deleteMany({ where: { playbookId: id } });
        await tx.playbookStep.createMany({
          data: dto.steps.map((s) => ({
            playbookId: id,
            title: s.title,
            description: s.description,
            dayOffset: s.dayOffset,
            order: s.order ?? 0,
          })),
        });
      }

      return tx.playbook.update({
        where: { id },
        data: {
          name: dto.name,
          trigger: dto.trigger,
          active: dto.active,
        },
        include: { steps: { orderBy: { order: 'asc' } } },
      });
    });
  }

  async remove(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.playbook.delete({ where: { id } });
  }

  async startRunsForTrigger(
    trigger: PlaybookTrigger,
    params: { leadId: string; contractId?: string; tenantId: string },
  ) {
    const { leadId, contractId, tenantId } = params;

    const playbooks = await this.prisma.playbook.findMany({
      where: { tenantId, trigger, active: true },
      include: { steps: true },
    });
    if (playbooks.length === 0) return;

    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
      select: { ownerId: true },
    });
    if (!lead) return;

    for (const playbook of playbooks) {
      try {
        if (contractId) {
          const existing = await this.prisma.playbookRun.findFirst({
            where: { playbookId: playbook.id, contractId, status: 'active' },
          });
          if (existing) continue;
        }

        const now = new Date();
        await this.prisma.$transaction(async (tx) => {
          const run = await tx.playbookRun.create({
            data: { playbookId: playbook.id, leadId, contractId, tenantId, status: 'active' },
          });

          for (const step of playbook.steps) {
            const dueDate = new Date(now.getTime() + step.dayOffset * 24 * 3600000);
            await tx.task.create({
              data: {
                title: step.title,
                description: step.description,
                status: 'pending',
                priority: 'medium',
                dueDate,
                relatedType: 'playbook_run',
                relatedId: run.id,
                assigneeId: lead.ownerId,
                tenantId,
              },
            });
          }
        });
      } catch (err) {
        this.logger.error(`Failed to start playbook run for playbook ${playbook.id}`, err);
      }
    }
  }

  async getRunsForLead(leadId: string, tenantId: string) {
    const runs = await this.prisma.playbookRun.findMany({
      where: { leadId, tenantId },
      include: { playbook: { select: { id: true, name: true, trigger: true } } },
      orderBy: { startedAt: 'desc' },
    });
    if (runs.length === 0) return [];

    const tasks = await this.prisma.task.findMany({
      where: { tenantId, relatedType: 'playbook_run', relatedId: { in: runs.map((r) => r.id) } },
      orderBy: { dueDate: 'asc' },
    });

    const tasksByRunId = new Map<string, typeof tasks>();
    for (const task of tasks) {
      const list = tasksByRunId.get(task.relatedId!) ?? [];
      list.push(task);
      tasksByRunId.set(task.relatedId!, list);
    }

    return runs.map((run) => ({ ...run, tasks: tasksByRunId.get(run.id) ?? [] }));
  }
}
