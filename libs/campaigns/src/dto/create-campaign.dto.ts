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
  contactIds: string[];

  @IsDateString()
  @IsOptional()
  scheduledAt?: string;
}
