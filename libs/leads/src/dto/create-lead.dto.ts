import { IsString, IsOptional, IsNumber, IsObject, IsIn, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

const CONTACT_STATUSES = ['new', 'contacted', 'qualified', 'lost'];

export class CreateLeadDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  value?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  expectedCloseDate?: string;

  @IsObject()
  @IsOptional()
  customFields?: Record<string, any>;

  @IsString()
  @IsOptional()
  campaignId?: string;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsIn(CONTACT_STATUSES)
  @IsOptional()
  customerStatus?: string;

  @IsString()
  @IsOptional()
  utmSource?: string;

  @IsString()
  @IsOptional()
  utmMedium?: string;

  @IsString()
  @IsOptional()
  utmCampaign?: string;

  @IsString()
  @IsOptional()
  utmTerm?: string;

  @IsString()
  @IsOptional()
  utmContent?: string;

  @IsString()
  @IsOptional()
  careerId?: string;

  @IsString()
  @IsOptional()
  modalityId?: string;

  @IsString()
  @IsOptional()
  subPhaseId?: string;

  @IsString()
  @IsOptional()
  referredByLeadId?: string;
}

export class UpdateLeadDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  value?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  expectedCloseDate?: string;

  @IsObject()
  @IsOptional()
  customFields?: Record<string, any>;

  @IsString()
  @IsOptional()
  campaignId?: string;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsIn(CONTACT_STATUSES)
  @IsOptional()
  customerStatus?: string;

  @IsString()
  @IsOptional()
  utmSource?: string;

  @IsString()
  @IsOptional()
  utmMedium?: string;

  @IsString()
  @IsOptional()
  utmCampaign?: string;

  @IsString()
  @IsOptional()
  utmTerm?: string;

  @IsString()
  @IsOptional()
  utmContent?: string;

  @IsString()
  @IsOptional()
  careerId?: string;

  @IsString()
  @IsOptional()
  modalityId?: string;

  @IsString()
  @IsOptional()
  subPhaseId?: string | null;

  @IsString()
  @IsOptional()
  referredByLeadId?: string;

  @IsBoolean()
  @IsOptional()
  isPartner?: boolean;
}

export class QueryLeadDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  campaignId?: string;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsString()
  @IsOptional()
  customerStatus?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  careerId?: string;

  @IsString()
  @IsOptional()
  modalityId?: string;

  @IsString()
  @IsOptional()
  tagId?: string;
}
