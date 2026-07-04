import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  name: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;

  @IsString()
  @IsOptional()
  templateId?: string;

  @IsArray()
  @IsString({ each: true })
  leadIds: string[];

  @IsDateString()
  @IsOptional()
  scheduledAt?: string;
}

export class UpdateCampaignDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsOptional()
  body?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  leadIds?: string[];
}
