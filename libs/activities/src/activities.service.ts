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
    return this.prisma.activity.create({
      data: {
        type: dto.type as any,
        subject: dto.subject,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        done: dto.done,
        contactId: dto.contactId,
        dealId: dto.dealId,
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

    return activity;
  }

  async findAll(filters: {
    contactId?: string;
    dealId?: string;
    ownerId?: string;
    from?: string;
    to?: string;
    tenantId: string;
  }) {
    const where: any = { tenantId: filters.tenantId };
    if (filters.contactId) where.contactId = filters.contactId;
    if (filters.dealId) where.dealId = filters.dealId;
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
        contact: { select: { id: true, name: true } },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async getCalendar(userId: string, tenantId: string, from?: string, to?: string) {
    const start = from ? new Date(from) : new Date();
    const end = to ? new Date(to) : new Date(start.getTime() + 30 * 24 * 3600000);

    const activities = await this.prisma.activity.findMany({
      where: {
        tenantId,
        ownerId: userId,
        dueDate: { gte: start, lte: end },
      },
      include: {
        contact: { select: { id: true, name: true } },
        deal: { select: { id: true, title: true } },
      },
      orderBy: { dueDate: 'asc' },
    });

    return activities;
  }

  async findById(id: string, tenantId: string) {
    const activity = await this.prisma.activity.findFirst({
      where: { id, tenantId },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        contact: { select: { id: true, name: true } },
        deal: { select: { id: true, title: true } },
      },
    });
    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  async update(id: string, dto: UpdateActivityDto, tenantId: string) {
    await this.findById(id, tenantId);
    const data: any = { ...dto };
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    const updated = await this.prisma.activity.update({ where: { id }, data });
    
    if (updated.type === 'meeting') {
      await this.googleCalendarService.syncActivity(updated.id);
    }
    
    return updated;
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.activity.delete({ where: { id } });
  }
}
