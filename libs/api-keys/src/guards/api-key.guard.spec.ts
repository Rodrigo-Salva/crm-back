import { UnauthorizedException } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

function makeContext(request: any) {
  return {
    switchToHttp: () => ({ getRequest: () => request }),
  } as any;
}

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let apiKeysService: any;

  beforeEach(() => {
    apiKeysService = { validate: jest.fn() };
    guard = new ApiKeyGuard(apiKeysService);
  });

  it('rejects the request when the x-api-key header is missing', async () => {
    await expect(guard.canActivate(makeContext({ headers: {} }))).rejects.toThrow(UnauthorizedException);
    expect(apiKeysService.validate).not.toHaveBeenCalled();
  });

  it('rejects the request when the key does not validate', async () => {
    apiKeysService.validate.mockResolvedValue(null);

    await expect(
      guard.canActivate(makeContext({ headers: { 'x-api-key': 'crm_invalid' } })),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('attaches apiKeyTenantId to the request and allows access for a valid key', async () => {
    apiKeysService.validate.mockResolvedValue({ tenantId: 'tenant-1' });
    const request: any = { headers: { 'x-api-key': 'crm_valid' } };

    const result = await guard.canActivate(makeContext(request));

    expect(result).toBe(true);
    expect(request.apiKeyTenantId).toBe('tenant-1');
    expect(apiKeysService.validate).toHaveBeenCalledWith('crm_valid');
  });
});
