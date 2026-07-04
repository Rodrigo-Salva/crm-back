import { Controller, Post, Get, Patch, Body, Param, UseGuards, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Verify2faDto, Enable2faDto, TogglePortalAccessDto, ChangePortalPasswordDto, UpdateMeDto, ChangePasswordDto } from './dto/auth-extra.dto';
import { AllowWithoutTwoFactor } from './decorators/allow-without-two-factor.decorator';

const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 3600 * 1000,
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Req() req: any, @Res({ passthrough: true }) res: Response) {
    const tenantSlug = req.headers['x-tenant-slug'] || req.headers['x-tenant'];
    const result = await this.authService.register(dto, tenantSlug);
    res.cookie('session_token', result.token, SESSION_COOKIE_OPTIONS);
    return result;
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto);
    if ('token' in result) res.cookie('session_token', result.token, SESSION_COOKIE_OPTIONS);
    return result;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: any) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    return this.authService.loginWithGoogle(req.user);
  }

  @Post('2fa/verify')
  async verify2fa(@Body() dto: Verify2faDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.verify2FA(dto.userId, dto.code);
    res.cookie('session_token', result.token, SESSION_COOKIE_OPTIONS);
    return result;
  }

  @Get('2fa/generate')
  @UseGuards(AuthGuard('jwt'))
  @AllowWithoutTwoFactor()
  generate2faQr(@Req() req: any) {
    return this.authService.generate2faQr(req.user.id);
  }

  @Post('2fa/enable')
  @UseGuards(AuthGuard('jwt'))
  @AllowWithoutTwoFactor()
  async enable2fa(@Body() dto: Enable2faDto, @Req() req: any, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.enable2fa(req.user.id, dto.code);
    res.cookie('session_token', result.token, SESSION_COOKIE_OPTIONS);
    return result;
  }

  @Post('portal-login')
  async portalLogin(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.portalLogin(dto);
    res.cookie('portal_session_token', result.token, SESSION_COOKIE_OPTIONS);
    return result;
  }

  @Post('logout')
  @AllowWithoutTwoFactor()
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('session_token');
    res.clearCookie('portal_session_token');
    return { message: 'Logged out' };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @AllowWithoutTwoFactor()
  me(@Req() req: any) {
    return this.authService.me(req.user.id);
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  updateMe(@Body() dto: UpdateMeDto, @Req() req: any) {
    return this.authService.updateMe(req.user.id, dto);
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  changePassword(@Body() dto: ChangePasswordDto, @Req() req: any) {
    return this.authService.changePassword(req.user.id, dto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Patch('leads/:id/portal-access')
  @UseGuards(AuthGuard('jwt'))
  togglePortalAccess(@Param('id') leadId: string, @Body() dto: TogglePortalAccessDto, @Req() req: any) {
    return this.authService.togglePortalAccess(leadId, dto, req.user.tenantId);
  }

  @Post('portal/change-password')
  @UseGuards(AuthGuard('jwt'))
  changePortalPassword(@Body() dto: ChangePortalPasswordDto, @Req() req: any) {
    return this.authService.changePortalPassword(req.user, dto);
  }
}
