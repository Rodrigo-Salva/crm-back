import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { GoogleCalendarService } from './google-calendar.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly googleCalendarService: GoogleCalendarService
  ) {}

  async create(dto: CreateActivityDto, ownerId: string, tenantId: string) {
    const activity = await this.prisma.activity.create({
      data: {
        type: dto.type as any,
        subject: dto.subject,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        done: dto.done,
        leadId: dto.leadId,
        ownerId,
        tenantId,
      },
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });

    if (activity.type === 'meeting') {
      await this.googleCalendarService.syncActivity(activity.id);
    }

    if (dto.reminderMinutesBefore != null && activity.dueDate) {
      await this.prisma.reminder.create({
        data: { activityId: activity.id, userId: ownerId, minutesBefore: dto.reminderMinutesBefore },
      });
    }

    return activity;
  }

  async findAll(filters: {
    leadId?: string;
    ownerId?: string;
    from?: string;
    to?: string;
    tenantId: string;
  }) {
    const where: any = { tenantId: filters.tenantId };
    if (filters.leadId) where.leadId = filters.leadId;
    if (filters.ownerId) where.ownerId = filters.ownerId;
    if (filters.from || filters.to) {
      where.dueDate = {};
      if (filters.from) where.dueDate.gte = new Date(filters.from);
      if (filters.to) where.dueDate.lte = new Date(filters.to);
    }

    return this.prisma.activity.findMany({
      where,
      include: {
        owner: { select: { id: true, name: true, email: true } },
        lead: { select: { id: true, name: true } },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async getCalendar(userId: string, tenantId: string, from?: string, to?: string) {
    const start = from ? new Date(from) : new Date();
    const end = to ? new Date(to) : new Date(start.getTime() + 30 * 24 * 3600000);

    const [activities, tasks] = await Promise.all([
      this.prisma.activity.findMany({
        where: {
          tenantId,
          ownerId: userId,
          dueDate: { gte: start, lte: end },
        },
        include: {
          lead: { select: { id: true, name: true } },
        },
        orderBy: { dueDate: 'asc' },
      }),
      this.prisma.task.findMany({
        where: {
          tenantId,
          assigneeId: userId,
          dueDate: { gte: start, lte: end },
        },
        orderBy: { dueDate: 'asc' },
      }),
    ]);

    const taskEvents = tasks.map((t) => ({
      id: t.id,
      type: 'task',
      subject: t.title,
      dueDate: t.dueDate,
      done: t.status === 'completed',
      isTask: true,
    }));

    return [...activities, ...taskEvents].sort(
      (a, b) => new Date(a.dueDate as any).getTime() - new Date(b.dueDate as any).getTime(),
    );
  }

  async findById(id: string, tenantId: string) {
    const activity = await this.prisma.activity.findFirst({
      where: { id, tenantId },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        lead: { select: { id: true, name: true } },
      },
    });
    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  async update(id: string, dto: UpdateActivityDto, tenantId: string, userId: string) {
    await this.findById(id, tenantId);
    const { reminderMinutesBefore, ...rest } = dto;
    const data: any = { ...rest };
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    const updated = await this.prisma.activity.update({ where: { id }, data });

    if (updated.type === 'meeting') {
      await this.googleCalendarService.syncActivity(updated.id);
    }

    if (reminderMinutesBefore !== undefined) {
      if (reminderMinutesBefore === null) {
        await this.prisma.reminder.deleteMany({ where: { activityId: id, userId } });
      } else {
        const existing = await this.prisma.reminder.findFirst({ where: { activityId: id, userId } });
        if (existing) {
          await this.prisma.reminder.update({
            where: { id: existing.id },
            data: { minutesBefore: reminderMinutesBefore, sent: false },
          });
        } else {
          await this.prisma.reminder.create({
            data: { activityId: id, userId, minutesBefore: reminderMinutesBefore },
          });
        }
      }
    }

    return updated;
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.activity.delete({ where: { id } });
  }
}
