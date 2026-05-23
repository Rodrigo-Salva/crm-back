import { Injectable, BadRequestException } from '@nestjs/common';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
import { PrismaService } from '@crm/shared';

@Injectable()
export class TwoFactorService {
  constructor(private readonly prisma: PrismaService) {}

  public generateTwoFactorSecret(user: any) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, 'CRM Pro', secret);

    return {
      secret,
      otpauthUrl,
    };
  }

  public async generateQrCodeDataURL(otpauthUrl: string) {
    return qrcode.toDataURL(otpauthUrl);
  }

  public isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: any) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorSecret,
    });
  }

  public async turnOnTwoFactorAuthentication(userId: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const isCodeValid = this.isTwoFactorAuthenticationCodeValid(code, user);
    
    if (!isCodeValid) {
      throw new BadRequestException('Wrong authentication code');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { isTwoFactorEnabled: true },
    });
  }
}
