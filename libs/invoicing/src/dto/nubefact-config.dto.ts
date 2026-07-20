import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpsertNubefactConfigDto {
  @IsString()
  ruc: string;

  @IsString()
  @IsOptional()
  token?: string;

  @IsString()
  @IsOptional()
  serieFactura?: string;

  @IsString()
  @IsOptional()
  serieBoleta?: string;

  @IsBoolean()
  @IsOptional()
  sandbox?: boolean;
}
