import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ALLOW_WITHOUT_TWO_FACTOR_KEY } from '../decorators/allow-without-two-factor.decorator';

@Injectable()
export class TwoFactorSetupGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Guards registered via APP_GUARD run before AuthGuard('jwt') populates request.user,
    // so the token is decoded directly here instead of relying on request.user.
    const authHeader: string | undefined = request.headers?.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
    if (!token) return true;

    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch {
      return true;
    }

    if (!payload?.mustSetupTwoFactor) return true;

    const allowed = this.reflector.getAllAndOverride<boolean>(ALLOW_WITHOUT_TWO_FACTOR_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (allowed) return true;

    throw new ForbiddenException('You must configure two-factor authentication before continuing');
  }
}
