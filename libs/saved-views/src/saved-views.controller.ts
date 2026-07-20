import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { SavedViewsService } from './saved-views.service';
import { CreateSavedViewDto } from './dto/create-saved-view.dto';

@Controller('saved-views')
@UseGuards(AuthGuard('jwt'))
export class SavedViewsController {
  constructor(private readonly service: SavedViewsService) {}

  @Get()
  findAll(@Query('entity') entity: string, @CurrentUser() user: any) {
    return this.service.findAll(entity, user.id, user.tenantId);
  }

  @Post()
  create(@Body() dto: CreateSavedViewDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.id, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.id, user.tenantId);
  }
}
