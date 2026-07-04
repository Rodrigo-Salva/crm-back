import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpsertSalesGoalDto {
  @IsString()
  userId: string;

  @IsNumber()
  @Min(2020)
  year: number;

  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @IsNumber()
  @Min(0)
  targetValue: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  targetDeals?: number;
}
