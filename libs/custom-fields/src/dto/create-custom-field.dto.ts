import { IsString, IsEnum, IsBoolean, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateCustomFieldDto {
  @IsString()
  name: string;

  @IsString()
  label: string;

  @IsString()
  type: string = 'text';

  @IsString()
  entity: string;

  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @IsArray()
  @IsOptional()
  options?: string[];

  @IsInt()
  @IsOptional()
  order?: number;
}
