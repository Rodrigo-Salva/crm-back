import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { AutomationService } from '@crm/automation';
import { CreateTaskDto, UpdateTaskDto, QueryTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly automation: AutomationService,
  ) {}

  async create(dto: CreateTaskDto, assigneeId: string, tenantId: string) {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: (dto.status as any) ?? 'pending',
        priority: (dto.priority as any) ?? 'medium',
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        relatedType: dto.relatedType,
        relatedId: dto.relatedId,
        teamId: dto.teamId,
        assigneeId,
        tenantId,
      },
    });
    await this.automation.evaluate('task.created', { ...task, entity: 'task', entityId: task.id }, tenantId);
    return task;
  }

  async findAll(query: QueryTaskDto, user: any) {
    const tenantId = user.tenantId;
    const { search, status, priority, dateFrom, dateTo, limit } = query;
    const where: any = { tenantId };
    if (user.role === 'seller') {
      where.assigneeId = user.id;
    }
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) where.title = { contains: search, mode: 'insensitive' };
    if (dateFrom || dateTo) {
      where.dueDate = {};
      if (dateFrom) where.dueDate.gte = new Date(dateFrom);
      if (dateTo) where.dueDate.lte = new Date(dateTo);
    }

    return this.prisma.task.findMany({
      where,
      include: { assignee: { select: { id: true, name: true } } },
      orderBy: { dueDate: 'asc' },
      take: limit ? Number(limit) : undefined,
    });
  }

  async findById(id: string, user: any) {
    const tenantId = user.tenantId;
    const task = await this.prisma.task.findFirst({
      where: { id, tenantId, ...(user.role === 'seller' ? { assigneeId: user.id } : {}) },
      include: { assignee: { select: { id: true, name: true, email: true } } },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto, user: any) {
    const tenantId = user.tenantId;
    await this.findById(id, user);
    const updated = await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status as any,
        priority: dto.priority as any,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        relatedType: dto.relatedType,
        relatedId: dto.relatedId,
        teamId: dto.teamId,
      },
    });
    await this.automation.evaluate('task.updated', { ...updated, entity: 'task', entityId: id }, tenantId);
    return updated;
  }

  async remove(id: string, user: any) {
    const tenantId = user.tenantId;
    await this.findById(id, user);
    return this.prisma.task.delete({ where: { id } });
  }
}
