import { IsString, IsInt, IsOptional, IsHexColor, IsBoolean, Min } from 'class-validator';

export class CreatePipelineStageDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsHexColor()
  @IsOptional()
  color?: string;

  @IsBoolean()
  @IsOptional()
  isWon?: boolean;

  @IsBoolean()
  @IsOptional()
  isLost?: boolean;

  @IsInt()
  @IsOptional()
  @Min(1)
  maxLeads?: number;
}
