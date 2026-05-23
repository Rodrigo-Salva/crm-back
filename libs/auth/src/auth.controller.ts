import { Controller, Post, Get, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto, @Req() req: any) {
    const tenantSlug = req.headers['x-tenant-slug'] || req.headers['x-tenant'];
    return this.authService.register(dto, tenantSlug);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    return this.authService.loginWithGoogle(req.user);
  }

  @Post('2fa/verify')
  verify2fa(@Body() dto: { userId: string; code: string }) {
    return this.authService.verify2FA(dto.userId, dto.code);
  }

  @Get('2fa/generate')
  @UseGuards(AuthGuard('jwt'))
  generate2faQr(@Req() req: any) {
    return this.authService.generate2faQr(req.user.id);
  }

  @Post('2fa/enable')
  @UseGuards(AuthGuard('jwt'))
  enable2fa(@Body() dto: { code: string }, @Req() req: any) {
    return this.authService.enable2fa(req.user.id, dto.code);
  }

  @Post('portal-login')
  portalLogin(@Body() dto: LoginDto) {
    return this.authService.portalLogin(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: any) {
    return this.authService.me(req.user.id);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Patch('contacts/:id/portal-access')
  @UseGuards(AuthGuard('jwt'))
  togglePortalAccess(@Param('id') contactId: string, @Body() dto: { password?: string; enable: boolean }, @Req() req: any) {
    return this.authService.togglePortalAccess(contactId, dto, req.user.tenantId);
  }

  @Post('portal/change-password')
  @UseGuards(AuthGuard('jwt'))
  changePortalPassword(@Body() dto: { currentPassword: string; newPassword: string }, @Req() req: any) {
    return this.authService.changePortalPassword(req.user, dto);
  }
}
