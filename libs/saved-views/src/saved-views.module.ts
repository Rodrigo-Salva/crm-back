import { Module } from '@nestjs/common';
import { SharedModule } from '@crm/shared';
import { SavedViewsService } from './saved-views.service';
import { SavedViewsController } from './saved-views.controller';

@Module({
  imports: [SharedModule],
  controllers: [SavedViewsController],
  providers: [SavedViewsService],
  exports: [SavedViewsService],
})
export class SavedViewsModule {}
