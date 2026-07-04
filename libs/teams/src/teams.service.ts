import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: { name: string; description?: string; memberIds?: string[] }, tenantId: string) {
    return this.prisma.team.create({
      data: {
        name: dto.name,
        description: dto.description,
        tenantId,
        members: dto.memberIds?.length
          ? { create: dto.memberIds.map((userId) => ({ userId })) }
          : undefined,
      },
      include: { members: { include: { user: { select: { id: true, name: true, email: true } } } } },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.team.findMany({
      where: { tenantId },
      include: {
        members: { include: { user: { select: { id: true, name: true, email: true } } } },
        _count: { select: { tickets: true, tasks: true, leads: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string) {
    const team = await this.prisma.team.findFirst({
      where: { id, tenantId },
      include: {
        members: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } },
        _count: { select: { tickets: true, tasks: true, leads: true } },
      },
    });
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async update(id: string, dto: { name?: string; description?: string }, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.team.update({ where: { id }, data: dto });
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.team.delete({ where: { id } });
  }

  async addMember(teamId: string, userId: string, tenantId: string) {
    await this.findById(teamId, tenantId);
    return this.prisma.teamMember.create({ data: { teamId, userId } });
  }

  async removeMember(teamId: string, userId: string, tenantId: string) {
    await this.findById(teamId, tenantId);
    return this.prisma.teamMember.deleteMany({ where: { teamId, userId } });
  }

  async getAssignableUsers(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      select: { id: true, name: true, email: true, avatar: true },
    });
  }
}
