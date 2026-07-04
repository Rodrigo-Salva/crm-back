import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  relatedType: string;

  @IsString()
  @IsNotEmpty()
  relatedId: string;
}
