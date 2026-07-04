import { IsNumber, IsString, IsOptional, IsEnum, ValidateIf } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreatePaymentDto {
  @ValidateIf((dto) => !dto.invoiceId)
  @IsString()
  quoteId?: string;

  @ValidateIf((dto) => !dto.quoteId)
  @IsString()
  invoiceId?: string;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
