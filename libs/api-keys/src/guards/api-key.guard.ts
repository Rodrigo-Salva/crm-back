import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeysService } from '../api-keys.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = request.headers['x-api-key'];
    if (!key) throw new UnauthorizedException('Missing x-api-key header');

    const result = await this.apiKeysService.validate(key);
    if (!result) throw new UnauthorizedException('Invalid API key');

    request.apiKeyTenantId = result.tenantId;
    return true;
  }
}
