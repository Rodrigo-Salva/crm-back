import { IsString } from 'class-validator';

export class AttachTagDto {
  @IsString()
  entity: string;

  @IsString()
  entityId: string;

  @IsString()
  tagName: string;
}
