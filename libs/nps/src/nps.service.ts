import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { EmailService } from '@crm/email';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NpsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
  ) {}

  async createAndSendSurvey(ticketId: string, tenantId: string) {
    const existing = await this.prisma.npsResponse.findUnique({ where: { ticketId } });
    if (existing) return existing;

    const ticket = await this.prisma.ticket.findFirst({
      where: { id: ticketId, tenantId },
      include: { lead: true },
    });
    if (!ticket?.lead?.email) return null;

    const token = uuid();
    const response = await this.prisma.npsResponse.create({
      data: {
        tenantId,
        ticketId,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 3600000),
      },
    });

    await this.email.sendNpsSurveyEmail(ticket.lead.email, token, tenantId);
    return response;
  }

  async getPublic(token: string) {
    const response = await this.prisma.npsResponse.findUnique({
      where: { token },
      include: { ticket: { select: { number: true, subject: true } } },
    });
    if (!response) throw new BadRequestException('Encuesta no encontrada');
    return {
      ticketNumber: response.ticket.number,
      subject: response.ticket.subject,
      alreadyResponded: !!response.respondedAt,
      expired: response.expiresAt < new Date(),
    };
  }

  async submitResponse(token: string, dto: { score: number; comment?: string }) {
    const response = await this.prisma.npsResponse.findUnique({ where: { token } });
    if (!response) throw new BadRequestException('Encuesta no encontrada');
    if (response.respondedAt) throw new BadRequestException('Ya se respondió esta encuesta');
    if (response.expiresAt < new Date()) throw new BadRequestException('La encuesta expiró');

    return this.prisma.npsResponse.update({
      where: { token },
      data: { score: dto.score, comment: dto.comment, respondedAt: new Date() },
    });
  }

  async getStats(tenantId: string) {
    const responses = await this.prisma.npsResponse.findMany({
      where: { tenantId, respondedAt: { not: null } },
      select: { score: true },
    });

    const total = responses.length;
    const promoters = responses.filter((r) => (r.score ?? 0) >= 9).length;
    const passives = responses.filter((r) => (r.score ?? 0) >= 7 && (r.score ?? 0) <= 8).length;
    const detractors = responses.filter((r) => (r.score ?? 0) <= 6).length;
    const nps = total > 0 ? Math.round(((promoters - detractors) / total) * 100) : null;

    return { total, promoters, passives, detractors, nps };
  }
}
