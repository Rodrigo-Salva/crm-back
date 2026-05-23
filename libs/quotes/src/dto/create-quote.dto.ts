import { IsString, IsOptional, IsArray, IsNumber, IsObject } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsOptional()
  dealId?: string;

  @IsString()
  @IsOptional()
  contactId?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsArray()
  items: {
    productId?: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discountPercent?: number;
    currency?: string;
  }[];

  @IsNumber()
  @IsOptional()
  discountPercent?: number;

  @IsNumber()
  @IsOptional()
  taxPercent?: number;
}
