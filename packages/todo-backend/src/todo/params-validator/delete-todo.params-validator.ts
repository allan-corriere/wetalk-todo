import { IsUUID } from 'class-validator';

export class DeleteTodoParamsValidator {
  @IsUUID()
  uuid: string;
}
