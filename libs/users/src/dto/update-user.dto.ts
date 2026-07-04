import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsIn(['admin', 'seller', 'reader'])
  @IsOptional()
  role?: 'admin' | 'seller' | 'reader';
}
