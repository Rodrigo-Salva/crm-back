import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '@crm/shared';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  tenantId: string;
  isPortal?: boolean;
  mustSetupTwoFactor?: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret',
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.isPortal) {
      const lead = await this.prisma.lead.findUnique({
        where: { id: payload.sub },
        select: { id: true, name: true, email: true, tenantId: true },
      });
      if (!lead) throw new UnauthorizedException('Lead not found');
      return { ...lead, role: 'portal', isPortal: true };
    }
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, role: true, tenantId: true },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return { ...user, mustSetupTwoFactor: payload.mustSetupTwoFactor ?? false };
  }
}
