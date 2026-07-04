import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { AutomationService } from '@crm/automation';
import { CreateLeadFormDto, UpdateLeadFormDto } from './dto/create-lead-form.dto';

function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .normalize('NFD')
    .replace(new RegExp('[̀-ͯ]', 'g'), '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base || 'form'}-${suffix}`;
}

@Injectable()
export class LeadFormsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly automation: AutomationService,
  ) {}

  async create(dto: CreateLeadFormDto, tenantId: string) {
    return this.prisma.leadForm.create({
      data: {
        name: dto.name,
        slug: dto.slug || slugify(dto.name),
        fields: dto.fields as any,
        campaignId: dto.campaignId,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.leadForm.findMany({
      where: { tenantId },
      include: { campaign: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string) {
    const form = await this.prisma.leadForm.findFirst({ where: { id, tenantId } });
    if (!form) throw new NotFoundException('Formulario no encontrado');
    return form;
  }

  async update(id: string, dto: UpdateLeadFormDto, tenantId: string) {
    await this.findById(id, tenantId);
    const data: any = { ...dto };
    Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
    return this.prisma.leadForm.update({ where: { id }, data });
  }

  async remove(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.leadForm.delete({ where: { id } });
  }

  async getPublicForm(slug: string) {
    const form = await this.prisma.leadForm.findFirst({ where: { slug, active: true } });
    if (!form) throw new NotFoundException('Formulario no encontrado o inactivo');
    return { id: form.id, name: form.name, fields: form.fields };
  }

  async submit(slug: string, payload: Record<string, any>) {
    const form = await this.prisma.leadForm.findFirst({ where: { slug, active: true } });
    if (!form) throw new NotFoundException('Formulario no encontrado o inactivo');

    const fields = form.fields as unknown as { name: string; required: boolean }[];
    for (const field of fields) {
      if (field.required && !payload[field.name]) {
        throw new BadRequestException(`El campo "${field.name}" es requerido`);
      }
    }

    const firstStage = await this.prisma.pipelineStage.findFirst({
      where: { tenantId: form.tenantId },
      orderBy: { order: 'asc' },
    });

    const owner = await this.prisma.user.findFirst({
      where: { tenantId: form.tenantId, role: { in: ['admin', 'seller'] } },
      orderBy: { createdAt: 'asc' },
    });
    if (!owner) throw new BadRequestException('El tenant no tiene un propietario válido para asignar el lead');

    const knownFields = new Set(['name', 'email', 'phone', 'company']);
    const customFields: Record<string, any> = {};
    for (const [key, value] of Object.entries(payload)) {
      if (!knownFields.has(key)) customFields[key] = value;
    }

    const lead = await this.prisma.lead.create({
      data: {
        name: payload.name || 'Lead sin nombre',
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        source: 'web',
        status: firstStage?.name ?? 'new',
        campaignId: form.campaignId,
        customFields: Object.keys(customFields).length ? customFields : undefined,
        ownerId: owner.id,
        tenantId: form.tenantId,
      },
    });

    await this.automation.evaluate('lead.created', { ...lead, entity: 'lead', entityId: lead.id }, form.tenantId);

    return { id: lead.id, message: 'Lead creado correctamente' };
  }
}
