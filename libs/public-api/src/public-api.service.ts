import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { LeadsService } from '@crm/leads';
import { TicketsService } from '@crm/tickets';
import { CreatePublicLeadDto } from './dto/create-public-lead.dto';
import { CreatePublicTicketDto } from './dto/create-public-ticket.dto';

@Injectable()
export class PublicApiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly leadsService: LeadsService,
    private readonly ticketsService: TicketsService,
  ) {}

  private async resolveDefaultOwner(tenantId: string) {
    const owner = await this.prisma.user.findFirst({
      where: { tenantId, role: { in: ['admin', 'superadmin'] } },
      orderBy: { createdAt: 'asc' },
    });
    if (!owner) throw new BadRequestException('No admin user found to assign this record to');
    return owner;
  }

  async createLead(dto: CreatePublicLeadDto, tenantId: string) {
    const owner = await this.resolveDefaultOwner(tenantId);
    return this.leadsService.create(dto as any, owner.id, tenantId);
  }

  async getLead(id: string, tenantId: string) {
    return this.leadsService.findById(id, { tenantId, role: 'api' });
  }

  async createTicket(dto: CreatePublicTicketDto, tenantId: string) {
    const owner = await this.resolveDefaultOwner(tenantId);
    return this.ticketsService.create(dto, owner.id, tenantId);
  }

  async getTicket(id: string, tenantId: string) {
    return this.ticketsService.findById(id, tenantId);
  }
}
