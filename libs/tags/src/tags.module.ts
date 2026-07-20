import { Module } from '@nestjs/common';
import { SharedModule } from '@crm/shared';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  imports: [SharedModule],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
