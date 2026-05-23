import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@crm/shared';
import { TenantService } from '@crm/tenant';
import { TwoFactorService } from './two-factor.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly tenantService: TenantService,
    private readonly twoFactorService: TwoFactorService,
  ) {}

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
      select: { id: true, email: true, name: true, role: true, tenantId: true },
    });

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    });

    return { user, token };
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

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    });

    const { password, twoFactorSecret, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async verify2FA(userId: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const isCodeValid = this.twoFactorService.isTwoFactorAuthenticationCodeValid(code, user);
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    });

    const { password, twoFactorSecret, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
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

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    });

    const { password, twoFactorSecret, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
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
    return { success: true };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, avatar: true, role: true, tenantId: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
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

    // TODO: Send email with reset link
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
    const contact = await this.prisma.contact.findFirst({
      where: { email: dto.email, portalPassword: { not: null } },
    });
    if (!contact || !contact.portalPassword) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, contact.portalPassword);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: contact.id,
      email: contact.email,
      role: 'portal',
      tenantId: contact.tenantId,
      isPortal: true,
    });

    return { contact: { id: contact.id, name: contact.name, email: contact.email }, token };
  }

  async togglePortalAccess(contactId: string, dto: { password?: string; enable: boolean }, tenantId: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id: contactId, tenantId },
    });
    if (!contact) throw new NotFoundException('Contact not found');

    if (dto.enable && dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      await this.prisma.contact.update({
        where: { id: contactId },
        data: { portalPassword: hashedPassword },
      });
      return { message: 'Portal access enabled' };
    }

    if (!dto.enable) {
      await this.prisma.contact.update({
        where: { id: contactId },
        data: { portalPassword: null },
      });
      return { message: 'Portal access disabled' };
    }

    return { message: 'No changes made' };
  }

  async changePortalPassword(user: any, dto: { currentPassword: string; newPassword: string }) {
    if (!user.isPortal) throw new UnauthorizedException('Not a portal user');

    const contact = await this.prisma.contact.findUnique({
      where: { id: user.id },
      select: { portalPassword: true },
    });
    if (!contact?.portalPassword) throw new BadRequestException('Portal access not configured');

    const isValid = await bcrypt.compare(dto.currentPassword, contact.portalPassword);
    if (!isValid) throw new UnauthorizedException('Current password is incorrect');

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.contact.update({
      where: { id: user.id },
      data: { portalPassword: hashedPassword },
    });

    return { message: 'Password updated successfully' };
  }
}
