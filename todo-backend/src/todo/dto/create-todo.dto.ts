import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @MaxLength(255)
  description: string;
}
