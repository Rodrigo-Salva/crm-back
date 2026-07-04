import { IsString, IsEnum, IsOptional, IsBoolean, IsDateString, IsInt, Min } from 'class-validator';

export enum ActivityType {
  CALL = 'call',
  MEETING = 'meeting',
  EMAIL = 'email',
  NOTE = 'note',
  TASK = 'task',
}

export class CreateActivityDto {
  @IsEnum(ActivityType)
  type: ActivityType;

  @IsString()
  subject: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @IsString()
  @IsOptional()
  leadId?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  reminderMinutesBefore?: number;
}
