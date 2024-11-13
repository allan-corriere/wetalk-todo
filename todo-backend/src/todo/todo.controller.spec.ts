import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { FindOneTodoParamsValidator } from './params-validator/findone-todo.params-validator';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;

  const mockTodoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    jest.spyOn(mockTodoService, 'create').mockReturnValue(todo);

    const result = controller.create(createTodoDto);

    expect(mockTodoService.create).toHaveBeenCalled();
    expect(mockTodoService.create).toHaveBeenCalledWith(createTodoDto);
    expect(result).toEqual(todo);
  });

  it('should find all todos', () => {
    const todo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the butter",
    };
    const todos: Todo[] = [todo];

    jest.spyOn(mockTodoService, 'findAll').mockReturnValue(todos);

    const result = controller.findAll();

    expect(mockTodoService.findAll).toHaveBeenCalled();
    expect(result).toEqual(todos);
  });

  it('should find a todo given a valid uuid', () => {
    const findOneTodoParamsValidator: FindOneTodoParamsValidator = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
    };
    const todo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the butter",
    };

    jest.spyOn(mockTodoService, 'findOne').mockReturnValue(todo);

    const result = controller.findOne(findOneTodoParamsValidator);

    expect(mockTodoService.findOne).toHaveBeenCalled();
    expect(mockTodoService.findOne).toHaveBeenCalledWith(
      findOneTodoParamsValidator.uuid,
    );
    expect(result).toEqual(todo);
  });

  it('should update description of a todo given an existing uuid', async () => {
    const findOneTodoParamsValidator: FindOneTodoParamsValidator = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
    };
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

    jest.spyOn(mockTodoService, 'findOne').mockReturnValue(todo);
    jest.spyOn(mockTodoService, 'update').mockReturnValue(updatedTodo);

    const result = await controller.update(
      findOneTodoParamsValidator,
      updateTodoDto,
    );

    expect(mockTodoService.findOne).toHaveBeenCalled();
    expect(mockTodoService.findOne).toHaveBeenCalledWith(
      findOneTodoParamsValidator.uuid,
    );
    expect(mockTodoService.update).toHaveBeenCalled();
    expect(mockTodoService.update).toHaveBeenCalledWith(
      findOneTodoParamsValidator.uuid,
      updateTodoDto,
    );
    expect(result).toEqual(updatedTodo);
  });

  it('should update title of a todo given an existing uuid', async () => {
    const findOneTodoParamsValidator: FindOneTodoParamsValidator = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
    };
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

    jest.spyOn(mockTodoService, 'findOne').mockReturnValue(todo);
    jest.spyOn(mockTodoService, 'update').mockReturnValue(updatedTodo);

    const result = await controller.update(
      findOneTodoParamsValidator,
      updateTodoDto,
    );

    expect(mockTodoService.findOne).toHaveBeenCalled();
    expect(mockTodoService.findOne).toHaveBeenCalledWith(
      findOneTodoParamsValidator.uuid,
    );
    expect(mockTodoService.update).toHaveBeenCalled();
    expect(mockTodoService.update).toHaveBeenCalledWith(
      findOneTodoParamsValidator.uuid,
      updateTodoDto,
    );
    expect(result).toEqual(updatedTodo);
  });

  it('should delete a todo given a valid uuid', async () => {
    const findOneTodoParamsValidator: FindOneTodoParamsValidator = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
    };
    const todo: Todo = {
      uuid: '9adc891d-9afe-4ff2-b37c-9c2fb89de882',
      title: 'Do groceries',
      description: "Don't forget the butter",
    };

    jest.spyOn(mockTodoService, 'findOne').mockReturnValue(todo);
    jest.spyOn(mockTodoService, 'remove').mockReturnValue(todo);

    const result = await controller.remove(findOneTodoParamsValidator);

    expect(mockTodoService.findOne).toHaveBeenCalled();
    expect(mockTodoService.findOne).toHaveBeenCalledWith(
      findOneTodoParamsValidator.uuid,
    );
    expect(mockTodoService.remove).toHaveBeenCalled();
    expect(mockTodoService.remove).toHaveBeenCalledWith(
      findOneTodoParamsValidator.uuid,
    );
    expect(result).toEqual(todo);
  });
});
