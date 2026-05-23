import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { AutomationService } from '@crm/automation';
import { AuditService } from '@crm/audit';
import { WebhooksService } from '@crm/webhooks';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { QueryContactDto } from './dto/query-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly automation: AutomationService,
    private readonly audit: AuditService,
    private readonly webhooks: WebhooksService,
  ) {}

  async create(dto: CreateContactDto, ownerId: string, tenantId: string) {
    const contact = await this.prisma.contact.create({
      data: { ...dto, ownerId, tenantId },
    });

    await this.audit.log({
      entity: 'contact', entityId: contact.id, action: 'created',
      changes: { name: dto.name, email: dto.email },
      userId: ownerId, tenantId,
    });

    await this.automation.evaluate('contact.created', { ...contact, entity: 'contact', entityId: contact.id }, tenantId);
    await this.webhooks.emit('contact.created', { ...contact, entity: 'contact', entityId: contact.id }, tenantId);

    return contact;
  }

  async findAll(query: QueryContactDto, tenantId: string) {
    const { search, page = 1, limit = 20 } = query;
    const where: any = { tenantId };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        include: { owner: { select: { id: true, name: true, email: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contact.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findById(id: string, tenantId: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, tenantId },
      include: { owner: { select: { id: true, name: true, email: true } }, deals: true },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async update(id: string, dto: UpdateContactDto, tenantId: string) {
    await this.findById(id, tenantId);
    const updated = await this.prisma.contact.update({ where: { id }, data: dto });

    await this.audit.log({
      entity: 'contact', entityId: id, action: 'updated',
      changes: dto, userId: updated.ownerId, tenantId,
    });
    await this.webhooks.emit('contact.updated', { ...updated, entity: 'contact', entityId: id }, tenantId);

    return updated;
  }

  async remove(id: string, tenantId: string) {
    const contact = await this.findById(id, tenantId);
    await this.audit.log({
      entity: 'contact', entityId: id, action: 'deleted',
      changes: { name: contact.name, email: contact.email },
      userId: contact.ownerId, tenantId,
    });
    return this.prisma.contact.delete({ where: { id } });
  }
}
