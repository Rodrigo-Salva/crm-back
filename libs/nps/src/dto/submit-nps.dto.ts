import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';

export class SubmitNpsDto {
  @IsInt()
  @Min(0)
  @Max(10)
  score: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
