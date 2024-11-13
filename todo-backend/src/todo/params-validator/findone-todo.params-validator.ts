import { IsUUID } from 'class-validator';

export class FindOneTodoParamsValidator {
  @IsUUID()
  uuid: string;
}
