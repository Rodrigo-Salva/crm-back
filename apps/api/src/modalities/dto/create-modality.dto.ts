import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateModalityDto {
  @IsString()
  name!: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
