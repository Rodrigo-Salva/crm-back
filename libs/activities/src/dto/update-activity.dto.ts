import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, Min } from 'class-validator';
import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends PartialType(OmitType(CreateActivityDto, ['reminderMinutesBefore'] as const)) {
  @IsInt()
  @Min(1)
  @IsOptional()
  reminderMinutesBefore?: number | null;
}
