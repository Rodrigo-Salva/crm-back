import { IsString, IsOptional } from 'class-validator';

export class CreateConnectionDto {
  @IsString()
  sourceNodeId: string;

  @IsString()
  targetNodeId: string;

  @IsString()
  @IsOptional()
  sourceHandle?: string;
}
