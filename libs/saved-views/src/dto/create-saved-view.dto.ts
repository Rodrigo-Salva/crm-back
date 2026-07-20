import { IsString, IsObject } from 'class-validator';

export class CreateSavedViewDto {
  @IsString()
  entity: string;

  @IsString()
  name: string;

  @IsObject()
  filters: Record<string, any>;
}
