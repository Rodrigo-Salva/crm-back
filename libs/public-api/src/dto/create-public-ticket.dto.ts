import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreatePublicTicketDto {
  @IsString()
  subject!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(['low', 'medium', 'high', 'critical'])
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  leadId?: string;
}
