import { Injectable, BadRequestException } from '@nestjs/common';
import { generateSecret, generateURI, verify } from 'otplib';
import * as qrcode from 'qrcode';
import { PrismaService } from '@crm/shared';

@Injectable()
export class TwoFactorService {
  constructor(private readonly prisma: PrismaService) {}

  public generateTwoFactorSecret(user: any) {
    const secret = generateSecret();
    const otpauthUrl = generateURI({ issuer: 'Conecta', label: user.email, secret });

    return {
      secret,
      otpauthUrl,
    };
  }

  public async generateQrCodeDataURL(otpauthUrl: string) {
    return qrcode.toDataURL(otpauthUrl);
  }

  public async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: any) {
    const result = await verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorSecret,
    });
    return result.valid;
  }

  public async turnOnTwoFactorAuthentication(userId: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const isCodeValid = await this.isTwoFactorAuthenticationCodeValid(code, user);

    if (!isCodeValid) {
      throw new BadRequestException('Wrong authentication code');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { isTwoFactorEnabled: true },
    });
  }
}
