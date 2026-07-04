import {
  Injectable,
  Logger,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@crm/shared';
import { TenantService } from '@crm/tenant';
import { EmailService } from '@crm/email';
import { TwoFactorService } from './two-factor.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly tenantService: TenantService,
    private readonly twoFactorService: TwoFactorService,
    private readonly emailService: EmailService,
  ) {}

  private async buildToken(user: { id: string; email: string; role: string; tenantId: string; isTwoFactorEnabled: boolean }) {
    let mustSetupTwoFactor = false;
    if (!user.isTwoFactorEnabled) {
      const setting = await this.prisma.tenantSetting.findUnique({
        where: { key_tenantId: { key: 'twoFactorRequiredRoles', tenantId: user.tenantId } },
      });
      const requiredRoles = setting?.value.split(',').map((r) => r.trim()).filter(Boolean) ?? [];
      mustSetupTwoFactor = requiredRoles.includes(user.role);
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
      ...(mustSetupTwoFactor ? { mustSetupTwoFactor: true } : {}),
    });

    return { token, mustSetupTwoFactor };
  }

  async register(dto: RegisterDto, tenantSlug?: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (existingUser) throw new ConflictException('Email already registered');

    if (dto.password.length < 8) throw new BadRequestException('Password must be at least 8 characters');
    if (!/[A-Z]/.test(dto.password)) throw new BadRequestException('Password must contain an uppercase letter');
    if (!/[a-z]/.test(dto.password)) throw new BadRequestException('Password must contain a lowercase letter');
    if (!/[0-9]/.test(dto.password)) throw new BadRequestException('Password must contain a number');

    let tenantId: string;

    if (dto.tenantSlug) {
      const tenant = await this.tenantService.findBySlug(dto.tenantSlug);
      if (!tenant) throw new BadRequestException('Tenant not found');
      tenantId = tenant.id;
    } else if (tenantSlug) {
      const tenant = await this.tenantService.findBySlug(tenantSlug);
      if (!tenant) throw new BadRequestException('Tenant not found');
      tenantId = tenant.id;
    } else {
      throw new BadRequestException('Tenant identifier required');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        role: 'seller',
        tenantId,
      },
      select: { id: true, email: true, name: true, role: true, tenantId: true, isTwoFactorEnabled: true },
    });

    const { token, mustSetupTwoFactor } = await this.buildToken(user);

    return { user, token, mustSetupTwoFactor };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    if (user.isTwoFactorEnabled) {
      return { requires2FA: true, userId: user.id };
    }

    const { token, mustSetupTwoFactor } = await this.buildToken(user);

    const { password, twoFactorSecret, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token, mustSetupTwoFactor };
  }

  async verify2FA(userId: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const isCodeValid = await this.twoFactorService.isTwoFactorAuthenticationCodeValid(code, user);
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const { token, mustSetupTwoFactor } = await this.buildToken(user);

    const { password, twoFactorSecret, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token, mustSetupTwoFactor };
  }

  async loginWithGoogle(reqUser: any) {
    // Attempt to find by email
    let user = await this.prisma.user.findFirst({
      where: { email: reqUser.email },
    });

    if (!user) {
      // For now, if the user does not exist in a tenant, we reject them.
      // In a real app, you might auto-provision a tenant or add them to a pending queue
      throw new UnauthorizedException('No account found with this email. Please register first or ask for an invite.');
    }

    // Update their SSO details and refresh token if they exist
    user = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ssoProvider: 'google',
        ssoId: reqUser.ssoId,
        googleRefreshToken: reqUser.refreshToken || user.googleRefreshToken,
      },
    });

    // Enforce 2FA if enabled
    if (user.isTwoFactorEnabled) {
      return { requires2FA: true, userId: user.id };
    }

    const { token, mustSetupTwoFactor } = await this.buildToken(user);

    const { password, twoFactorSecret, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token, mustSetupTwoFactor };
  }

  async generate2faQr(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const { secret, otpauthUrl } = this.twoFactorService.generateTwoFactorSecret(user);
    
    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret },
    });

    return {
      qrCode: await this.twoFactorService.generateQrCodeDataURL(otpauthUrl),
    };
  }

  async enable2fa(userId: string, code: string) {
    await this.twoFactorService.turnOnTwoFactorAuthentication(userId, code);
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const { token } = await this.buildToken(user);
    return { success: true, token };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, avatar: true, role: true, tenantId: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  async updateMe(userId: string, dto: { name?: string; avatar?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { name: dto.name, avatar: dto.avatar },
      select: { id: true, email: true, name: true, avatar: true, role: true, tenantId: true, createdAt: true },
    });
  }

  async changePassword(userId: string, dto: { currentPassword: string; newPassword: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const isValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isValid) throw new UnauthorizedException('Current password is incorrect');

    if (dto.newPassword.length < 8) throw new BadRequestException('Password must be at least 8 characters');
    if (!/[A-Z]/.test(dto.newPassword)) throw new BadRequestException('Password must contain an uppercase letter');
    if (!/[a-z]/.test(dto.newPassword)) throw new BadRequestException('Password must contain a lowercase letter');
    if (!/[0-9]/.test(dto.newPassword)) throw new BadRequestException('Password must contain a number');

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });

    return { message: 'Password updated successfully' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (!user) return { message: 'If the email exists, a reset link has been sent' };

    const token = uuid();
    const expiresAt = new Date(Date.now() + 3600000);

    await this.prisma.passwordResetToken.create({
      data: { email: dto.email, token, expiresAt },
    });

    try {
      await this.emailService.sendPasswordResetEmail(dto.email, token, user.tenantId);
    } catch (err: any) {
      this.logger.warn(`Failed to send password reset email to ${dto.email}: ${err.message}`);
    }

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token: dto.token },
    });
    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.prisma.user.updateMany({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    });

    await this.prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true },
    });

    return { message: 'Password updated successfully' };
  }

  async portalLogin(dto: LoginDto) {
    const lead = await this.prisma.lead.findFirst({
      where: { email: dto.email, portalPassword: { not: null } },
    });
    if (!lead || !lead.portalPassword) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, lead.portalPassword);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: lead.id,
      email: lead.email,
      role: 'portal',
      tenantId: lead.tenantId,
      isPortal: true,
    });

    return { contact: { id: lead.id, name: lead.name, email: lead.email }, token };
  }

  async togglePortalAccess(leadId: string, dto: { password?: string; enable: boolean }, tenantId: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id: leadId, tenantId },
    });
    if (!lead) throw new NotFoundException('Lead not found');

    if (dto.enable && dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      await this.prisma.lead.update({
        where: { id: leadId },
        data: { portalPassword: hashedPassword },
      });
      return { message: 'Portal access enabled' };
    }

    if (!dto.enable) {
      await this.prisma.lead.update({
        where: { id: leadId },
        data: { portalPassword: null },
      });
      return { message: 'Portal access disabled' };
    }

    return { message: 'No changes made' };
  }

  async changePortalPassword(user: any, dto: { currentPassword: string; newPassword: string }) {
    if (!user.isPortal) throw new UnauthorizedException('Not a portal user');

    const lead = await this.prisma.lead.findUnique({
      where: { id: user.id },
      select: { portalPassword: true },
    });
    if (!lead?.portalPassword) throw new BadRequestException('Portal access not configured');

    const isValid = await bcrypt.compare(dto.currentPassword, lead.portalPassword);
    if (!isValid) throw new UnauthorizedException('Current password is incorrect');

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.lead.update({
      where: { id: user.id },
      data: { portalPassword: hashedPassword },
    });

    return { message: 'Password updated successfully' };
  }
}
