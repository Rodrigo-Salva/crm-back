import { IsString, IsInt, IsOptional, IsHexColor } from 'class-validator';

export class CreatePipelineStageDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsHexColor()
  @IsOptional()
  color?: string;
}
