import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { NotificationsService } from '@crm/notifications';
import { NubefactService } from '@crm/invoicing';
import { BillingInterval, Currency } from '@prisma/client';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly nubefact: NubefactService,
  ) {}

  static addInterval(date: Date, interval: BillingInterval): Date {
    const next = new Date(date);
    switch (interval) {
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
      case 'quarterly':
        next.setMonth(next.getMonth() + 3);
        break;
      case 'yearly':
        next.setFullYear(next.getFullYear() + 1);
        break;
    }
    return next;
  }

  async createForContract(
    contractId: string,
    dto: { billingInterval: BillingInterval; amount: number; currency?: Currency; startDate?: string },
    tenantId: string,
  ) {
    const startDate = dto.startDate ? new Date(dto.startDate) : new Date();
    return this.prisma.subscription.create({
      data: {
        contractId,
        billingInterval: dto.billingInterval,
        amount: dto.amount,
        currency: dto.currency ?? 'MXN',
        startDate,
        nextBillingDate: startDate,
        tenantId,
      },
    });
  }

  async findById(id: string, tenantId: string, user?: any) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { id, tenantId },
      include: { contract: { include: { lead: true } }, invoices: { orderBy: { dueDate: 'desc' } } },
    });
    if (!subscription) throw new NotFoundException('Subscription not found');
    if (user?.isPortal && subscription.contract.leadId !== user.id) {
      throw new ForbiddenException('Not your subscription');
    }
    return subscription;
  }

  async findByContract(contractId: string, tenantId: string) {
    return this.prisma.subscription.findFirst({
      where: { contractId, tenantId },
      include: { invoices: { orderBy: { dueDate: 'desc' } } },
    });
  }

  async pause(id: string, tenantId: string) {
    const subscription = await this.findById(id, tenantId);
    if (subscription.status !== 'active') throw new BadRequestException('Only active subscriptions can be paused');
    return this.prisma.subscription.update({ where: { id }, data: { status: 'paused' } });
  }

  async cancel(id: string, tenantId: string) {
    const subscription = await this.findById(id, tenantId);
    if (subscription.status === 'cancelled') throw new BadRequestException('Subscription already cancelled');
    return this.prisma.subscription.update({
      where: { id },
      data: { status: 'cancelled', cancelledAt: new Date() },
    });
  }

  async generateInvoice(subscriptionId: string, tenantId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { id: subscriptionId, tenantId },
      include: { contract: { include: { lead: true } } },
    });
    if (!subscription) throw new NotFoundException('Subscription not found');
    if (subscription.status !== 'active') {
      throw new BadRequestException('Only active subscriptions can generate invoices');
    }

    const now = new Date();
    const number = await this.getNextInvoiceNumber(tenantId);
    const dueDate = new Date(now.getTime() + 7 * 24 * 3600000);

    const invoice = await this.prisma.invoice.create({
      data: {
        number,
        subscriptionId: subscription.id,
        currency: subscription.currency,
        amount: subscription.amount,
        dueDate,
        tenantId,
      },
    });

    try {
      await this.nubefact.issueInvoice(invoice.id, tenantId);
    } catch {}

    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        lastBilledAt: now,
        nextBillingDate: SubscriptionsService.addInterval(subscription.nextBillingDate, subscription.billingInterval),
      },
    });

    const lead = subscription.contract.lead;
    await this.prisma.task.create({
      data: {
        title: `Enviar factura ${invoice.number} a ${lead.name}`,
        description: `Se generó la factura recurrente de la suscripción del contrato ${subscription.contract.number}.`,
        status: 'pending',
        priority: 'medium',
        dueDate: now,
        relatedType: 'invoice',
        relatedId: invoice.id,
        assigneeId: subscription.contract.createdById,
        tenantId,
      },
    });

    await this.notificationsService.create({
      userId: subscription.contract.createdById,
      title: 'Factura recurrente generada',
      body: `Se generó la factura ${invoice.number} para ${lead.name}.`,
      link: `/contracts/${subscription.contractId}`,
    });

    return invoice;
  }

  async getNextInvoiceNumber(tenantId: string): Promise<string> {
    const last = await this.prisma.invoice.findFirst({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      select: { number: true },
    });
    const lastNum = last ? parseInt(last.number.replace('INV-', ''), 10) : 0;
    return `INV-${String(lastNum + 1).padStart(5, '0')}`;
  }

  async findAllSubscriptions(tenantId: string) {
    return this.prisma.subscription.findMany({
      where: { tenantId },
      include: { contract: { include: { lead: true } }, invoices: { orderBy: { dueDate: 'desc' } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findInvoicesBySubscription(subscriptionId: string, tenantId: string) {
    return this.prisma.invoice.findMany({
      where: { subscriptionId, tenantId },
      orderBy: { dueDate: 'desc' },
      include: { payments: true },
    });
  }

  async findAllInvoices(tenantId: string) {
    return this.prisma.invoice.findMany({
      where: { tenantId },
      orderBy: { dueDate: 'desc' },
      include: { payments: true, subscription: { include: { contract: { include: { lead: true } } } } },
    });
  }

  async findInvoicesForLead(leadId: string, tenantId: string) {
    return this.prisma.invoice.findMany({
      where: { tenantId, subscription: { contract: { leadId } } },
      orderBy: { dueDate: 'desc' },
      include: { payments: true, subscription: { select: { id: true, contractId: true } } },
    });
  }

  async findInvoiceById(id: string, tenantId: string, user?: any) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, tenantId },
      include: {
        payments: true,
        subscription: { include: { contract: { include: { lead: true, quote: true } } } },
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    if (user?.isPortal && invoice.subscription?.contract.leadId !== user.id) {
      throw new ForbiddenException('Not your invoice');
    }
    return invoice;
  }

  async sendInvoice(id: string, tenantId: string) {
    const invoice = await this.prisma.invoice.findFirst({ where: { id, tenantId } });
    if (!invoice) throw new NotFoundException('Invoice not found');
    if (invoice.status !== 'pending' && invoice.status !== 'overdue') {
      throw new BadRequestException('Invoice already sent or paid');
    }
    return this.prisma.invoice.update({
      where: { id },
      data: { status: 'sent', sentAt: new Date() },
    });
  }
}
