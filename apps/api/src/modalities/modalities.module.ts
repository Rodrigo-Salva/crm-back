import { Module } from '@nestjs/common';
import { ModalitiesService } from './modalities.service';
import { ModalitiesController } from './modalities.controller';

@Module({
  controllers: [ModalitiesController],
  providers: [ModalitiesService],
})
export class ModalitiesModule {}
