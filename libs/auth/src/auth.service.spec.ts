import { ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let prisma: any;
  let jwtService: any;
  let tenantService: any;
  let twoFactorService: any;
  let emailService: any;

  beforeEach(() => {
    prisma = {
      user: { findFirst: jest.fn(), findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
      passwordResetToken: { create: jest.fn() },
      tenantSetting: { findUnique: jest.fn().mockResolvedValue(null) },
    };
    jwtService = { sign: jest.fn().mockReturnValue('signed-jwt') };
    tenantService = { findBySlug: jest.fn() };
    twoFactorService = {};
    emailService = { sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined) };
    service = new AuthService(prisma, jwtService, tenantService, twoFactorService, emailService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    const validDto = { email: 'new@test.com', password: 'Password1', name: 'New User', tenantSlug: 'acme' };

    it('rejects when the email is already registered', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'existing' });

      await expect(service.register(validDto as any)).rejects.toThrow(ConflictException);
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it.each([
      ['short', 'Pass1'],
      ['no uppercase', 'password1'],
      ['no lowercase', 'PASSWORD1'],
      ['no number', 'Password'],
    ])('rejects a password that is %s', async (_label, password) => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.register({ ...validDto, password } as any)).rejects.toThrow(BadRequestException);
    });

    it('rejects when neither tenantSlug nor dto.tenantSlug is provided', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.register({ ...validDto, tenantSlug: undefined } as any)).rejects.toThrow(BadRequestException);
    });

    it('creates the user under the resolved tenant and returns a signed token', async () => {
      prisma.user.findFirst.mockResolvedValue(null);
      tenantService.findBySlug.mockResolvedValue({ id: 'tenant-1' });
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      prisma.user.create.mockResolvedValue({ id: 'user-1', email: validDto.email, name: validDto.name, role: 'seller', tenantId: 'tenant-1' });

      const result = await service.register(validDto as any);

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ password: 'hashed-password', tenantId: 'tenant-1' }) }),
      );
      expect(result.token).toBe('signed-jwt');
      expect(result.user.email).toBe(validDto.email);
    });

    it('rejects when the tenant slug does not resolve to a tenant', async () => {
      prisma.user.findFirst.mockResolvedValue(null);
      tenantService.findBySlug.mockResolvedValue(null);

      await expect(service.register(validDto as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    const dto = { email: 'user@test.com', password: 'Password1' };

    it('rejects when the user does not exist', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.login(dto as any)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects when the password is incorrect', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'user-1', password: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto as any)).rejects.toThrow(UnauthorizedException);
    });

    it('asks for 2FA instead of returning a token when enabled', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'user-1', password: 'hashed', isTwoFactorEnabled: true });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(dto as any);

      expect(result).toEqual({ requires2FA: true, userId: 'user-1' });
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('returns a signed token and strips sensitive fields when 2FA is disabled', async () => {
      prisma.user.findFirst.mockResolvedValue({
        id: 'user-1', email: dto.email, password: 'hashed', twoFactorSecret: 'secret', isTwoFactorEnabled: false, role: 'seller', tenantId: 'tenant-1',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(dto as any);

      expect(result.token).toBe('signed-jwt');
      expect(result.user).not.toHaveProperty('password');
      expect(result.user).not.toHaveProperty('twoFactorSecret');
    });
  });

  describe('forgotPassword', () => {
    const dto = { email: 'user@test.com' };

    it('does nothing observable when the user does not exist', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      const result = await service.forgotPassword(dto as any);

      expect(prisma.passwordResetToken.create).not.toHaveBeenCalled();
      expect(emailService.sendPasswordResetEmail).not.toHaveBeenCalled();
      expect(result).toEqual({ message: 'If the email exists, a reset link has been sent' });
    });

    it('creates a reset token and sends the email with the user tenantId', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'user-1', email: dto.email, tenantId: 'tenant-1' });
      prisma.passwordResetToken.create.mockResolvedValue({});

      const result = await service.forgotPassword(dto as any);

      expect(prisma.passwordResetToken.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ email: dto.email }) }),
      );
      expect(emailService.sendPasswordResetEmail).toHaveBeenCalledWith(
        dto.email,
        expect.any(String),
        'tenant-1',
      );
      expect(result).toEqual({ message: 'If the email exists, a reset link has been sent' });
    });

    it('still returns the generic message when sending the email fails', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'user-1', email: dto.email, tenantId: 'tenant-1' });
      prisma.passwordResetToken.create.mockResolvedValue({});
      emailService.sendPasswordResetEmail.mockRejectedValue(new Error('SMTP down'));

      const result = await service.forgotPassword(dto as any);

      expect(result).toEqual({ message: 'If the email exists, a reset link has been sent' });
    });
  });
});
