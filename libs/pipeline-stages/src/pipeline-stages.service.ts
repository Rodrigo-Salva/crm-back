import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreatePipelineStageDto } from './dto/create-pipeline-stage.dto';
import { UpdatePipelineStageDto } from './dto/update-pipeline-stage.dto';
import { CreatePipelineSubPhaseDto } from './dto/create-pipeline-sub-phase.dto';
import { UpdatePipelineSubPhaseDto } from './dto/update-pipeline-sub-phase.dto';

@Injectable()
export class PipelineStagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePipelineStageDto, tenantId: string) {
    const maxOrder = await this.prisma.pipelineStage.findFirst({
      where: { tenantId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    return this.prisma.pipelineStage.create({
      data: { ...dto, order: dto.order ?? (maxOrder?.order ?? -1) + 1, tenantId },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.pipelineStage.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' },
      include: { subPhases: { orderBy: { order: 'asc' } } },
    });
  }

  async update(id: string, dto: UpdatePipelineStageDto, tenantId: string) {
    const stage = await this.prisma.pipelineStage.findFirst({ where: { id, tenantId } });
    if (!stage) throw new NotFoundException('Pipeline stage not found');
    return this.prisma.pipelineStage.update({ where: { id }, data: dto });
  }

  async remove(id: string, tenantId: string) {
    const stage = await this.prisma.pipelineStage.findFirst({ where: { id, tenantId } });
    if (!stage) throw new NotFoundException('Pipeline stage not found');
    return this.prisma.pipelineStage.delete({ where: { id } });
  }

  async findSubPhases(stageId: string, tenantId: string) {
    const stage = await this.prisma.pipelineStage.findFirst({ where: { id: stageId, tenantId } });
    if (!stage) throw new NotFoundException('Pipeline stage not found');
    return this.prisma.pipelineSubPhase.findMany({
      where: { pipelineStageId: stageId, tenantId },
      orderBy: { order: 'asc' },
    });
  }

  async createSubPhase(stageId: string, dto: CreatePipelineSubPhaseDto, tenantId: string) {
    const stage = await this.prisma.pipelineStage.findFirst({ where: { id: stageId, tenantId } });
    if (!stage) throw new NotFoundException('Pipeline stage not found');

    const maxOrder = await this.prisma.pipelineSubPhase.findFirst({
      where: { pipelineStageId: stageId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    return this.prisma.pipelineSubPhase.create({
      data: { ...dto, order: dto.order ?? (maxOrder?.order ?? -1) + 1, pipelineStageId: stageId, tenantId },
    });
  }

  async updateSubPhase(stageId: string, id: string, dto: UpdatePipelineSubPhaseDto, tenantId: string) {
    const subPhase = await this.prisma.pipelineSubPhase.findFirst({ where: { id, pipelineStageId: stageId, tenantId } });
    if (!subPhase) throw new NotFoundException('Pipeline sub-phase not found');
    return this.prisma.pipelineSubPhase.update({ where: { id }, data: dto });
  }

  async removeSubPhase(stageId: string, id: string, tenantId: string) {
    const subPhase = await this.prisma.pipelineSubPhase.findFirst({ where: { id, pipelineStageId: stageId, tenantId } });
    if (!subPhase) throw new NotFoundException('Pipeline sub-phase not found');
    return this.prisma.pipelineSubPhase.delete({ where: { id } });
  }
}
