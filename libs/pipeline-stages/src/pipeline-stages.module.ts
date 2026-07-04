import { Module } from '@nestjs/common';
import { RolePermissionsModule } from '@crm/role-permissions';
import { PipelineStagesService } from './pipeline-stages.service';
import { PipelineStagesController } from './pipeline-stages.controller';

@Module({
  imports: [RolePermissionsModule],
  controllers: [PipelineStagesController],
  providers: [PipelineStagesService],
  exports: [PipelineStagesService],
})
export class PipelineStagesModule {}
