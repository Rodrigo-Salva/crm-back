import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
