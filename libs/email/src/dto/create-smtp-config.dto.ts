import { IsString, IsInt, IsEmail, Min, Max } from 'class-validator';

export class CreateSmtpConfigDto {
  @IsString()
  host: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  port: number = 587;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  fromEmail: string;

  @IsString()
  fromName: string;
}
