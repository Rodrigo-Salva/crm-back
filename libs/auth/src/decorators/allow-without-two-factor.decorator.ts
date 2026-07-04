import { SetMetadata } from '@nestjs/common';

export const ALLOW_WITHOUT_TWO_FACTOR_KEY = 'allowWithoutTwoFactor';
export const AllowWithoutTwoFactor = () => SetMetadata(ALLOW_WITHOUT_TWO_FACTOR_KEY, true);
