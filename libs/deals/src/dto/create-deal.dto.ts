import { IsString, IsNumber, IsOptional, IsObject, Min, IsBoolean } from 'class-validator';

export class CreateDealDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  value?: number;

  @IsString()
  @IsOptional()
  stage?: string;

  @IsString()
  contactId: string;

  @IsString()
  @IsOptional()
  expectedCloseDate?: string;

  @IsObject()
  @IsOptional()
  customFields?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  convertedFromLead?: boolean;

  @IsString()
  @IsOptional()
  convertedFromId?: string;

  @IsOptional()
  @IsString()
  currency?: string;
}
