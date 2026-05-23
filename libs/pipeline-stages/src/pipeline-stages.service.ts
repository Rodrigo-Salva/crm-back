import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { CreatePipelineStageDto } from './dto/create-pipeline-stage.dto';
import { UpdatePipelineStageDto } from './dto/update-pipeline-stage.dto';

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
}
