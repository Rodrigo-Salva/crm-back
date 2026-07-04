import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateTimeEntryDto {
  @IsString()
  taskId!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  duration!: number;

  @IsString()
  @IsOptional()
  date?: string;
}
