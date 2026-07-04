import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class Verify2faDto {
  @IsString()
  userId!: string;

  @IsString()
  code!: string;
}

export class Enable2faDto {
  @IsString()
  code!: string;
}

export class TogglePortalAccessDto {
  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  enable!: boolean;
}

export class ChangePortalPasswordDto {
  @IsString()
  currentPassword!: string;

  @IsString()
  @MinLength(6)
  newPassword!: string;
}

export class UpdateMeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword!: string;

  @IsString()
  @MinLength(8)
  newPassword!: string;
}
