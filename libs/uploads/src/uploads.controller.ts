import { Controller, Get, Post, Delete, Param, Query, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CurrentUser } from '@crm/auth';
import { PermissionsGuard } from '@crm/role-permissions';
import { UploadsService } from './uploads.service';
import type { Response } from 'express';

@Controller('uploads')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class UploadsController {
  constructor(private readonly service: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('entity') entity: string,
    @Query('entityId') entityId: string,
    @CurrentUser() user: any,
  ) {
    return this.service.upload(file, entity, entityId, user.id, user.tenantId);
  }

  @Get()
  findByEntity(
    @Query('entity') entity: string,
    @Query('entityId') entityId: string,
    @CurrentUser() user: any,
  ) {
    return this.service.findByEntity(entity, entityId, user.tenantId);
  }

  @Get(':id/file')
  async getFile(@Param('id') id: string, @CurrentUser() user: any, @Res() res: Response) {
    const { file, stream } = await this.service.getFile(id, user.tenantId);
    res.set('Content-Type', file.mimeType);
    res.set('Content-Disposition', `inline; filename="${file.originalName}"`);
    stream.pipe(res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.tenantId);
  }
}
