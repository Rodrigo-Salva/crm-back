import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { SubscriptionsService } from '@crm/subscriptions';
import { PlaybooksService } from '@crm/playbooks';
import { WebhooksService } from '@crm/webhooks';
import { CreateContractDto } from './dto/create-contract.dto';
import * as crypto from 'crypto';

@Injectable()
export class ContractsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly playbooksService: PlaybooksService,
    private readonly webhooksService: WebhooksService,
  ) {}

  private async getNextNumber(tenantId: string): Promise<string> {
    const last = await this.prisma.contract.findFirst({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      select: { number: true },
    });
    const lastNum = last ? parseInt(last.number.replace('C-', ''), 10) : 0;
    return `C-${String(lastNum + 1).padStart(5, '0')}`;
  }

  async create(dto: CreateContractDto, userId: string, tenantId: string) {
    const quote = await this.prisma.quote.findFirst({ where: { id: dto.quoteId, tenantId } });
    if (!quote) throw new NotFoundException('Quote not found');
    if (!['approved', 'converted'].includes(quote.status)) {
      throw new BadRequestException('Quote must be approved or converted to create a contract');
    }
    if (!quote.leadId) throw new BadRequestException('Quote has no associated lead');

    const number = await this.getNextNumber(tenantId);
    const contract = await this.prisma.contract.create({
      data: {
        number,
        quoteId: dto.quoteId,
        leadId: quote.leadId,
        content: dto.content,
        createdById: userId,
        tenantId,
      },
    });

    await this.subscriptionsService.createForContract(
      contract.id,
      {
        billingInterval: dto.billingInterval,
        amount: dto.amount,
        currency: dto.currency ?? quote.currency,
        startDate: dto.startDate,
      },
      tenantId,
    );

    return this.findById(contract.id, tenantId);
  }

  async findAll(tenantId: string, user?: any, filters?: { leadId?: string; companyId?: string }) {
    const where: any = { tenantId };
    if (user?.isPortal) where.leadId = user.id;
    if (!user?.isPortal && filters?.leadId) where.leadId = filters.leadId;
    if (!user?.isPortal && filters?.companyId) where.lead = { companyId: filters.companyId };

    return this.prisma.contract.findMany({
      where,
      include: {
        lead: { select: { id: true, name: true, email: true } },
        quote: { select: { id: true, number: true, grandTotal: true, currency: true } },
        subscription: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, tenantId: string, user?: any) {
    const where: any = { id, tenantId };
    if (user?.isPortal) where.leadId = user.id;

    const contract = await this.prisma.contract.findFirst({
      where,
      include: {
        lead: { select: { id: true, name: true, email: true, companyName: true } },
        quote: { select: { id: true, number: true, grandTotal: true, currency: true } },
        createdBy: { select: { id: true, name: true } },
        subscription: { include: { invoices: { orderBy: { dueDate: 'desc' } } } },
      },
    });
    if (!contract) throw new NotFoundException('Contract not found');
    return contract;
  }

  async send(id: string, tenantId: string) {
    const contract = await this.findById(id, tenantId);
    if (contract.status !== 'draft') throw new BadRequestException('Only draft contracts can be sent');

    return this.prisma.contract.update({
      where: { id },
      data: { status: 'sent', sentAt: new Date() },
    });
  }

  async accept(id: string, user: any, ip: string | undefined) {
    if (!user?.isPortal) {
      throw new ForbiddenException('Only the client can accept the contract from the portal');
    }

    const contract = await this.prisma.contract.findFirst({ where: { id, tenantId: user.tenantId } });
    if (!contract || contract.leadId !== user.id) throw new NotFoundException('Contract not found');
    if (contract.status !== 'sent') throw new BadRequestException('Contract must be sent before it can be accepted');

    const documentHash = crypto.createHash('sha256').update(contract.content).digest('hex');

    const updated = await this.prisma.contract.update({
      where: { id },
      data: {
        status: 'accepted',
        acceptedByUserId: user.id,
        acceptedIp: ip,
        acceptedAt: new Date(),
        documentHash,
      },
    });

    await this.playbooksService.startRunsForTrigger('contract_accepted', {
      leadId: updated.leadId,
      contractId: updated.id,
      tenantId: user.tenantId,
    });

    await this.webhooksService.emit('contract.accepted', { ...updated, entity: 'contract', entityId: updated.id }, user.tenantId);

    return updated;
  }
}
