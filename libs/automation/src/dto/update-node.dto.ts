import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';

export class UpdateNodeDto {
  @IsString()
  @IsOptional()
  actionType?: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @IsNumber()
  @IsOptional()
  positionX?: number;

  @IsNumber()
  @IsOptional()
  positionY?: number;
}
