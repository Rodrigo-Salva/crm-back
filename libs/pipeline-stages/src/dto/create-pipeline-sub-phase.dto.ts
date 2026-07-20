import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreatePipelineSubPhaseDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  order?: number;
}
