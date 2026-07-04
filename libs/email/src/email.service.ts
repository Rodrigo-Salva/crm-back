import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { CreateSmtpConfigDto } from './dto/create-smtp-config.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private readonly trackingUrl: string;

  constructor(private readonly prisma: PrismaService) {
    this.trackingUrl = process.env.TRACKING_URL || 'http://localhost:3000';
  }

  async getSmtpConfig(tenantId: string) {
    const config = await this.prisma.smtpConfig.findUnique({ where: { tenantId } });
    if (!config) throw new NotFoundException('SMTP not configured');
    return config;
  }

  async upsertSmtpConfig(tenantId: string, dto: CreateSmtpConfigDto) {
    const existing = await this.prisma.smtpConfig.findUnique({ where: { tenantId } });
    const password = dto.password || existing?.password;
    if (!password) throw new BadRequestException('Password is required');

    return this.prisma.smtpConfig.upsert({
      where: { tenantId },
      create: { ...dto, password, tenantId },
      update: { ...dto, password },
    });
  }

  async getTemplates(tenantId?: string) {
    return this.prisma.emailTemplate.findMany({
      where: { OR: [{ tenantId }, { tenantId: null }] },
      orderBy: { name: 'asc' },
    });
  }

  async createTemplate(dto: CreateTemplateDto, tenantId?: string) {
    return this.prisma.emailTemplate.create({ data: { ...dto, tenantId } });
  }

  async updateTemplate(id: string, dto: CreateTemplateDto, tenantId?: string) {
    const template = await this.prisma.emailTemplate.findFirst({
      where: { id, OR: [{ tenantId }, { tenantId: null }] },
    });
    if (!template) throw new NotFoundException('Template not found');
    return this.prisma.emailTemplate.update({ where: { id }, data: dto });
  }

  async sendEmail(dto: SendEmailDto, tenantId: string) {
    let body = dto.body;
    let subject = dto.subject;

    if (dto.templateName || dto.templateId) {
      const template = dto.templateId
        ? await this.prisma.emailTemplate.findUnique({ where: { id: dto.templateId } })
        : await this.prisma.emailTemplate.findFirst({
            where: { name: dto.templateName, OR: [{ tenantId }, { tenantId: null }] },
          });
      if (!template) throw new NotFoundException('Template not found');
      body = template.body;
      subject = template.subject;
      if (dto.templateData) {
        for (const [key, value] of Object.entries(dto.templateData)) {
          body = body.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
          subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
        }
      }
    }

    const trackingId = uuidv4();
    const trackingPixel = `<img src="${this.trackingUrl}/email/track/${trackingId}.png" width="1" height="1" alt="" />`;
    body = body.replace('</body>', `${trackingPixel}</body>`);
    if (!body.includes('</body>')) body += trackingPixel;

    const config = await this.getSmtpConfig(tenantId);
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.username, pass: config.password },
    });

    try {
      const info = await transporter.sendMail({
        from: `"${config.fromName}" <${config.fromEmail}>`,
        to: dto.to,
        subject,
        html: body,
      });

      const lead = await this.prisma.lead.findFirst({
        where: { tenantId, email: { equals: dto.to, mode: 'insensitive' } },
      });

      await this.prisma.email.create({
        data: {
          direction: 'outbound',
          subject,
          body: body.substring(0, 5000),
          fromEmail: config.fromEmail,
          toEmail: dto.to,
          leadId: lead?.id,
          tenantId,
          trackingId,
          messageId: info.messageId,
        },
      });

      return { message: 'Email sent successfully', trackingId };
    } catch (err: any) {
      throw new BadRequestException(`Failed to send email: ${err.message}`);
    }
  }

  async trackOpen(trackingId: string) {
    await this.prisma.email.updateMany({
      where: { trackingId, openedAt: null },
      data: { openedAt: new Date() },
    });
  }

  async getHistory(tenantId: string, leadId?: string) {
    const where: any = { tenantId };
    if (leadId) where.leadId = leadId;
    return this.prisma.email.findMany({
      where,
      include: { lead: { select: { id: true, name: true, email: true } } },
      orderBy: { sentAt: 'desc' },
      take: 100,
    });
  }

  async sendPasswordResetEmail(email: string, token: string, tenantId?: string) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    const subject = 'Recuperación de contraseña';
    const body = `
      <h2>Recuperación de contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">Restablecer contraseña</a>
      <p>Este enlace expira en 1 hora.</p>
    `;

    if (tenantId) {
      return this.sendEmail({ to: email, subject, body }, tenantId);
    }
    return { message: 'Email not sent (SMTP not configured for reset)' };
  }
}
