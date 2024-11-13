import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeleteTodoParamsValidator } from './params-validator/delete-todo.params-validator';
import { FindOneTodoParamsValidator } from './params-validator/findone-todo.params-validator';
import { UpdateTodoParamsValidator } from './params-validator/update-todo.params-validator';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':uuid')
  findOne(@Param() params: FindOneTodoParamsValidator) {
    return this.todoService.findOne(params.uuid);
  }

  @Patch(':uuid')
  update(
    @Param() params: UpdateTodoParamsValidator,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(params.uuid, updateTodoDto);
  }

  @Delete(':uuid')
  remove(@Param() params: DeleteTodoParamsValidator) {
    return this.todoService.remove(params.uuid);
  }
}
