import { IsString, IsBoolean } from 'class-validator';

export class SetPermissionDto {
  @IsString()
  role!: string;

  @IsString()
  permission!: string;

  @IsBoolean()
  enabled!: boolean;
}
