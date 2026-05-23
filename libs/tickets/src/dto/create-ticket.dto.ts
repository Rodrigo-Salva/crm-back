import { IsString, IsOptional, IsEnum } from 'class-validator';

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
  contactId?: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;
}

export class AddMessageDto {
  @IsString()
  content: string;

  @IsOptional()
  isInternal?: boolean;
}
