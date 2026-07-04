import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export interface LeadFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea';
  required: boolean;
}

export class CreateLeadFormDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsArray()
  fields: LeadFormField[];

  @IsString()
  @IsOptional()
  campaignId?: string;
}

export class UpdateLeadFormDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsOptional()
  fields?: LeadFormField[];

  @IsString()
  @IsOptional()
  campaignId?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
