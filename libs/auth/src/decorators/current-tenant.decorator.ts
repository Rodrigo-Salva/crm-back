import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentTenant = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const tenant: Record<string, unknown> = { id: request.user?.tenantId };
    return data ? tenant[data] : tenant;
  },
);
