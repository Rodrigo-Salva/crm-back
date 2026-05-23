import { IsString, IsBoolean, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  name: string;

  @IsString()
  event: string;

  @IsArray()
  @IsOptional()
  conditions?: any[];

  @IsArray()
  actions: any[];

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
