import { IsString, IsOptional, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTicketDto {
  @IsString()
  subject: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  leadId?: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;
}

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsString()
  @IsOptional()
  status?: string;
}

export class AddMessageDto {
  @IsString()
  content: string;

  @IsOptional()
  isInternal?: boolean;
}
