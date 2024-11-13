import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;

  const mockTodoRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new todo given a valid object', () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Do groceries',
      description: "Don't forget the butter",
    };
    const todo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the butter",
    };

    jest.spyOn(mockTodoRepository, 'save').mockReturnValue(todo);

    const result = service.create(createTodoDto);

    expect(mockTodoRepository.save).toHaveBeenCalled();
    expect(mockTodoRepository.save).toHaveBeenCalledWith(createTodoDto);
    expect(result).toEqual(todo);
  });

  it('should find all todos', () => {
    const todo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the butter",
    };
    const todos: Todo[] = [todo];

    jest.spyOn(mockTodoRepository, 'find').mockReturnValue(todos);

    const result = service.findAll();

    expect(mockTodoRepository.find).toHaveBeenCalled();
    expect(result).toEqual(todos);
  });

  it('should find a todo given a valid uuid', async () => {
    const uuid: string = '9adc891d-9afe-4ff2-b37c-9c2fb89de882';
    const todo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the butter",
    };

    jest.spyOn(mockTodoRepository, 'findOneBy').mockReturnValue(todo);

    const result = await service.findOne(uuid);

    expect(mockTodoRepository.findOneBy).toHaveBeenCalled();
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ uuid });
    expect(result).toEqual(todo);
  });

  it('should throw a NotFoundException given a non-existing uuid', () => {
    const uuid: string = '9adc891d-9afe-4ff2-b37c-9c2fb89de882';
    const todo = null;

    jest.spyOn(mockTodoRepository, 'findOneBy').mockReturnValue(todo);

    expect(() => service.findOne(uuid)).rejects.toThrow(NotFoundException);

    expect(mockTodoRepository.findOneBy).toHaveBeenCalled();
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ uuid });
  });

  it('should update description of a todo given an existing uuid', async () => {
    const uuid: string = '9adc891d-9afe-4ff2-b37c-9c2fb89de882';
    const updateTodoDto: UpdateTodoDto = {
      description: "Don't forget the bread",
    };
    const todo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the butter",
    };
    const updatedTodo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the bread",
    };

    jest.spyOn(mockTodoRepository, 'findOneBy').mockReturnValue(todo);
    jest.spyOn(mockTodoRepository, 'save').mockReturnValue(updatedTodo);

    const result = await service.update(uuid, updateTodoDto);

    expect(mockTodoRepository.findOneBy).toHaveBeenCalled();
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ uuid });
    expect(mockTodoRepository.save).toHaveBeenCalled();
    expect(mockTodoRepository.save).toHaveBeenCalledWith(updatedTodo);
    expect(result).toEqual(updatedTodo);
  });

  it('should update title of a todo given an existing uuid', async () => {
    const uuid: string = '9adc891d-9afe-4ff2-b37c-9c2fb89de882';
    const updateTodoDto: UpdateTodoDto = {
      title: 'Go to the store',
    };
    const todo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the butter",
    };
    const updatedTodo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Go to the store',
      description: "Don't forget the butter",
    };

    jest.spyOn(mockTodoRepository, 'findOneBy').mockReturnValue(todo);
    jest.spyOn(mockTodoRepository, 'save').mockReturnValue(updatedTodo);

    const result = await service.update(uuid, updateTodoDto);

    expect(mockTodoRepository.findOneBy).toHaveBeenCalled();
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ uuid });
    expect(mockTodoRepository.save).toHaveBeenCalled();
    expect(mockTodoRepository.save).toHaveBeenCalledWith(updatedTodo);
    expect(result).toEqual(updatedTodo);
  });

  it('should delete a todo given a valid uuid', async () => {
    const uuid: string = '9adc891d-9afe-4ff2-b37c-9c2fb89de882';
    const todo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the butter",
    };

    jest.spyOn(mockTodoRepository, 'findOneBy').mockReturnValue(todo);
    jest.spyOn(mockTodoRepository, 'remove').mockReturnValue(todo);

    const result = await service.remove(uuid);

    expect(mockTodoRepository.findOneBy).toHaveBeenCalled();
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ uuid });
    expect(mockTodoRepository.remove).toHaveBeenCalled();
    expect(mockTodoRepository.remove).toHaveBeenCalledWith(todo);
    expect(result).toEqual(todo);
  });
});
