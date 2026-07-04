import { IsString, IsOptional, IsBoolean, IsArray, IsEnum, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlaybookTrigger } from '@prisma/client';

export class PlaybookStepDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  dayOffset: number;

  @IsInt()
  @IsOptional()
  order?: number;
}

export class CreatePlaybookDto {
  @IsString()
  name: string;

  @IsEnum(PlaybookTrigger)
  trigger: PlaybookTrigger;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlaybookStepDto)
  steps: PlaybookStepDto[];
}
