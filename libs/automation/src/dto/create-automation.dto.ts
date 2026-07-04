import { IsString } from 'class-validator';

export class CreateAutomationDto {
  @IsString()
  name: string;

  @IsString()
  event: string;
}
