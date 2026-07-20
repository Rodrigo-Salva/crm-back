import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { TagsService } from './tags.service';
import { AttachTagDto } from './dto/attach-tag.dto';

@Controller('tags')
@UseGuards(AuthGuard('jwt'))
export class TagsController {
  constructor(private readonly service: TagsService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.tenantId);
  }

  @Post('attach')
  attach(@Body() dto: AttachTagDto, @CurrentUser() user: any) {
    return this.service.attach(dto.entity, dto.entityId, dto.tagName, user.tenantId);
  }

  @Get('entity/:entity/:entityId')
  findForEntity(@Param('entity') entity: string, @Param('entityId') entityId: string, @CurrentUser() user: any) {
    return this.service.findForEntity(entity, entityId, user.tenantId);
  }

  @Delete('tag/:tagId')
  removeTag(@Param('tagId') tagId: string, @CurrentUser() user: any) {
    return this.service.removeTag(tagId, user.tenantId);
  }

  @Delete(':entityTagId')
  detach(@Param('entityTagId') entityTagId: string, @CurrentUser() user: any) {
    return this.service.detach(entityTagId, user.tenantId);
  }
}
