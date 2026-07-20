import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { AutomationService } from '@crm/automation';
import { AuditService } from '@crm/audit';
import { TagsService } from '@crm/tags';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { QueryCompanyDto } from './dto/query-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly automation: AutomationService,
    private readonly audit: AuditService,
    private readonly tags: TagsService,
  ) {}

  async create(dto: CreateCompanyDto, ownerId: string, tenantId: string) {
    const company = await this.prisma.company.create({
      data: { ...dto, ownerId, tenantId },
    });

    await this.audit.log({
      entity: 'company', entityId: company.id, action: 'created',
      changes: { name: dto.name, industry: dto.industry },
      userId: ownerId, tenantId,
    });

    await this.automation.evaluate('company.created', { ...company, entity: 'company', entityId: company.id }, tenantId);

    return company;
  }

  async findAll(query: QueryCompanyDto, tenantId: string) {
    const { search, tagId, page = 1, limit = 20 } = query;
    const where: any = { tenantId };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (tagId) {
      const entityIds = await this.tags.entityIdsForTag('company', tagId, tenantId);
      where.id = { in: entityIds };
    }

    const [data, total] = await Promise.all([
      this.prisma.company.findMany({
        where,
        include: { owner: { select: { id: true, name: true, email: true } }, _count: { select: { leads: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.company.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findById(id: string, tenantId: string) {
    const company = await this.prisma.company.findFirst({
      where: { id, tenantId },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        leads: { select: { id: true, name: true, email: true, status: true } },
      },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: string, dto: UpdateCompanyDto, tenantId: string) {
    await this.findById(id, tenantId);
    const updated = await this.prisma.company.update({ where: { id }, data: dto });

    await this.audit.log({
      entity: 'company', entityId: id, action: 'updated',
      changes: dto, userId: updated.ownerId, tenantId,
    });

    return updated;
  }

  async remove(id: string, tenantId: string) {
    const company = await this.findById(id, tenantId);
    await this.audit.log({
      entity: 'company', entityId: id, action: 'deleted',
      changes: { name: company.name },
      userId: company.ownerId, tenantId,
    });
    return this.prisma.company.delete({ where: { id } });
  }
}
