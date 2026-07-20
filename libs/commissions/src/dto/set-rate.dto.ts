import { IsNumber, Min, Max, ValidateIf } from 'class-validator';

export class SetDefaultRateDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  rate: number;
}

export class SetUserRateDto {
  @ValidateIf((o) => o.rate !== null)
  @IsNumber()
  @Min(0)
  @Max(100)
  rate: number | null;
}
