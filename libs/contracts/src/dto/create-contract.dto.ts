import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { BillingInterval, Currency } from '@prisma/client';

export class CreateContractDto {
  @IsString()
  quoteId: string;

  @IsString()
  content: string;

  @IsEnum(BillingInterval)
  billingInterval: BillingInterval;

  @IsNumber()
  amount: number;

  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @IsDateString()
  @IsOptional()
  startDate?: string;
}
