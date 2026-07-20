import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  billingType?: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  trackStock?: boolean;

  @IsOptional()
  @IsString()
  currency?: string;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  billingType?: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  trackStock?: boolean;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class CreatePriceListDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  items?: { productId: string; customPrice?: number }[];
}

export class CreateDiscountDto {
  @IsString()
  name: string;

  @IsNumber()
  percentage: number;

  @IsNumber()
  @IsOptional()
  minQuantity?: number;

  @IsString()
  @IsOptional()
  productId?: string;
}
