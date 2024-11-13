import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.save(createTodoDto);
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(uuid: string): Promise<Todo> {
    const todo: Todo = await this.todoRepository.findOneBy({ uuid });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async update(uuid: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo: Todo = await this.findOne(uuid);
    todo.title = updateTodoDto.title ? updateTodoDto.title : todo.title;
    todo.description = updateTodoDto.description
      ? updateTodoDto.description
      : todo.description;
    return this.todoRepository.save(todo);
  }

  async remove(uuid: string): Promise<Todo> {
    const todo = await this.findOne(uuid);
    return await this.todoRepository.remove(todo);
  }
}
