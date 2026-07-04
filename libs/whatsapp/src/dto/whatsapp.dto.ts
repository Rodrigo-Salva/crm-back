import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpsertWhatsappConfigDto {
  @IsString()
  phoneNumberId!: string;

  @IsString()
  accessToken!: string;

  @IsString()
  businessId!: string;
}

export class SendWhatsappDto {
  @IsString()
  to!: string;

  @IsString()
  templateName!: string;

  @IsObject()
  @IsOptional()
  params?: Record<string, string>;
}
