import { PartialType } from '@nestjs/mapped-types';
import { CreatePipelineSubPhaseDto } from './create-pipeline-sub-phase.dto';

export class UpdatePipelineSubPhaseDto extends PartialType(CreatePipelineSubPhaseDto) {}
