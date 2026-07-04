import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCareerDto {
  @IsString()
  name!: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
