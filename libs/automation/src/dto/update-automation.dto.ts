import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateAutomationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
