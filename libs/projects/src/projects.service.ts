import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreateProjectDto, UpdateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto, tenantId: string, ownerId: string) {
    const data = { ...dto, tenantId, ownerId: dto.ownerId || ownerId };
    return this.prisma.project.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.project.findMany({
      where: { tenantId },
      include: {
        lead: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, tenantId },
      include: {
        lead: true,
        owner: { select: { id: true, name: true, email: true } },
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, dto: UpdateProjectDto, tenantId: string) {
    await this.findById(id, tenantId); // verify exists
    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.project.delete({ where: { id } });
  }
}
