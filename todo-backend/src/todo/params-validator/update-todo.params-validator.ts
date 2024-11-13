import { IsUUID } from 'class-validator';

export class UpdateTodoParamsValidator {
  @IsUUID()
  uuid: string;
}
