import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { ProductsService } from './products.service';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post('products')
  create(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.create(dto, user.tenantId);
  }

  @Get('products')
  findAll(@Query('category') category: string, @CurrentUser() user: any) {
    return this.service.findAll(user.tenantId, category);
  }

  @Get('products/categories')
  getCategories(@CurrentUser() user: any) {
    return this.service.getCategories(user.tenantId);
  }

  @Get('products/:id')
  findById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.findById(id, user.tenantId);
  }

  @Patch('products/:id')
  update(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    return this.service.update(id, dto, user.tenantId);
  }

  @Delete('products/:id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }

  @Post('price-lists')
  createPriceList(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.createPriceList(dto, user.tenantId);
  }

  @Get('price-lists')
  getPriceLists(@CurrentUser() user: any) {
    return this.service.getPriceLists(user.tenantId);
  }

  @Post('discounts')
  createDiscount(@Body() dto: any, @CurrentUser() user: any) {
    return this.service.createDiscount(dto, user.tenantId);
  }

  @Get('discounts')
  getDiscounts(@CurrentUser() user: any) {
    return this.service.getDiscounts(user.tenantId);
  }

  @Get('products/:id/price')
  calculatePrice(
    @Param('id') id: string,
    @Query('quantity') quantity: string,
    @CurrentUser() user: any,
  ) {
    return this.service.calculatePrice(id, Number(quantity) || 1, user.tenantId);
  }
}
