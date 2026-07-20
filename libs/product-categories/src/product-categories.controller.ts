import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto/create-category.dto';

@Controller('product-categories')
@UseGuards(AuthGuard('jwt'))
export class ProductCategoriesController {
  constructor(private readonly service: ProductCategoriesService) {}

  @Post()
  create(@Body() dto: CreateProductCategoryDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductCategoryDto, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
