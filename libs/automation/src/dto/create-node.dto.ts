import { IsString, IsOptional, IsNumber, IsIn, IsObject } from 'class-validator';

export class CreateNodeDto {
  @IsIn(['trigger', 'action', 'wait', 'condition'])
  type: 'trigger' | 'action' | 'wait' | 'condition';

  @IsString()
  @IsOptional()
  actionType?: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @IsNumber()
  positionX: number;

  @IsNumber()
  positionY: number;
}
