import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportService } from './import.service';
import { CurrentUser } from '@crm/auth';

@Controller('import')
@UseGuards(AuthGuard('jwt'))
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('contacts')
  @UseInterceptors(FileInterceptor('file'))
  importContacts(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: any) {
    if (!file) throw new BadRequestException('CSV file required');
    return this.importService.importContacts(file.buffer, user.id, user.tenantId);
  }

  @Post('companies')
  @UseInterceptors(FileInterceptor('file'))
  importCompanies(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: any) {
    if (!file) throw new BadRequestException('CSV file required');
    return this.importService.importCompanies(file.buffer, user.id, user.tenantId);
  }

  @Post('deals')
  @UseInterceptors(FileInterceptor('file'))
  importDeals(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: any) {
    if (!file) throw new BadRequestException('CSV file required');
    return this.importService.importDeals(file.buffer, user.id, user.tenantId);
  }

  @Post('products')
  @UseInterceptors(FileInterceptor('file'))
  importProducts(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: any) {
    if (!file) throw new BadRequestException('CSV file required');
    return this.importService.importProducts(file.buffer, user.id, user.tenantId);
  }
}
