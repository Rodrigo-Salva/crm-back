import { ForbiddenException } from '@nestjs/common';
import { TwoFactorSetupGuard } from './two-factor-setup.guard';

function makeContext(headers: Record<string, string> = {}) {
  return {
    switchToHttp: () => ({ getRequest: () => ({ headers }) }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as any;
}

describe('TwoFactorSetupGuard', () => {
  let guard: TwoFactorSetupGuard;
  let reflector: any;
  let jwtService: any;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn().mockReturnValue(undefined) };
    jwtService = { verify: jest.fn() };
    guard = new TwoFactorSetupGuard(reflector, jwtService);
  });

  it('allows the request when there is no authorization header', () => {
    expect(guard.canActivate(makeContext())).toBe(true);
    expect(jwtService.verify).not.toHaveBeenCalled();
  });

  it('allows the request when the token cannot be verified', () => {
    jwtService.verify.mockImplementation(() => { throw new Error('invalid'); });

    expect(guard.canActivate(makeContext({ authorization: 'Bearer bad-token' }))).toBe(true);
  });

  it('allows the request when the token has no mustSetupTwoFactor claim', () => {
    jwtService.verify.mockReturnValue({ sub: 'user-1', role: 'admin' });

    expect(guard.canActivate(makeContext({ authorization: 'Bearer good-token' }))).toBe(true);
  });

  it('throws ForbiddenException when mustSetupTwoFactor is true and the route is not exempt', () => {
    jwtService.verify.mockReturnValue({ sub: 'user-1', role: 'admin', mustSetupTwoFactor: true });

    expect(() => guard.canActivate(makeContext({ authorization: 'Bearer token' }))).toThrow(ForbiddenException);
  });

  it('allows the request when mustSetupTwoFactor is true but the route is marked @AllowWithoutTwoFactor', () => {
    jwtService.verify.mockReturnValue({ sub: 'user-1', role: 'admin', mustSetupTwoFactor: true });
    reflector.getAllAndOverride.mockReturnValue(true);

    expect(guard.canActivate(makeContext({ authorization: 'Bearer token' }))).toBe(true);
  });
});
