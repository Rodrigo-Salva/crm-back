import { IsEmail, IsString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { ContactStatus } from '@prisma/client';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsEnum(ContactStatus)
  @IsOptional()
  status?: ContactStatus;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsObject()
  @IsOptional()
  customFields?: Record<string, any>;
}
