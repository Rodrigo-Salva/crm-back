import { IsString, IsOptional, IsArray, IsUrl, IsBoolean } from 'class-validator';

export class CreateWebhookDto {
  @IsUrl({ require_tld: false })
  url!: string;

  @IsArray()
  @IsString({ each: true })
  events!: string[];

  @IsString()
  @IsOptional()
  secret?: string;
}

export class UpdateWebhookDto {
  @IsUrl({ require_tld: false })
  @IsOptional()
  url?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  events?: string[];

  @IsString()
  @IsOptional()
  secret?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
