import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@crm/auth';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll(@Query('relatedType') relatedType: string, @Query('relatedId') relatedId: string, @CurrentUser() user: any) {
    return this.notesService.findAll(relatedType, relatedId, user.tenantId);
  }

  @Post()
  create(@Body() dto: CreateNoteDto, @CurrentUser() user: any) {
    return this.notesService.create(dto, user.id, user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto, @CurrentUser() user: any) {
    return this.notesService.update(id, dto, user.tenantId, user.id, user.role);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.notesService.remove(id, user.tenantId, user.id, user.role);
  }
}
