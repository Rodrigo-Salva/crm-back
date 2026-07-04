import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateImapConfigDto {
  @IsString()
  host: string;

  @IsNumber()
  @IsOptional()
  port?: number;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  useTLS?: boolean;
}
