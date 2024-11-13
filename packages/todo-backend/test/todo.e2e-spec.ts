import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TodoModule } from '../src/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../src/todo/entities/todo.entity';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';

describe('Todos', () => {
  let app: INestApplication;

  const createTodoDto: CreateTodoDto = {
    title: 'Do groceries',
    description: "Don't forget the butter",
  };

  const updatedTodo: CreateTodoDto = {
    title: 'Do groceries',
    description: "Don't forget the bread",
  };

  let uuid: string = '';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TodoModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'wetalkdev',
          password: 'welovetotalk',
          database: 'todo',
          entities: [Todo],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/POST todo', async () => {
    return request(app.getHttpServer())
      .post('/todo')
      .send(createTodoDto)
      .expect(201)
      .then(({ body }) => {
        uuid = body.uuid;
        expect(body.title).toEqual(createTodoDto.title);
        expect(body.description).toEqual(createTodoDto.description);
      });
  });

  it('/GET todo', async () => {
    return request(app.getHttpServer())
      .get('/todo')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([
          {
            uuid: uuid,
            ...createTodoDto,
          },
        ]);
      });
  });

  it('/GET todo/:uuid', async () => {
    return request(app.getHttpServer())
      .get('/todo/' + uuid)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          uuid: uuid,
          ...createTodoDto,
        });
      });
  });

  it('/PATCH todo/:uuid', async () => {
    return request(app.getHttpServer())
      .patch('/todo/' + uuid)
      .send({ description: "Don't forget the bread" })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          uuid: uuid,
          ...updatedTodo,
        });
      });
  });

  it('/DELETE todo/:uuid', async () => {
    return request(app.getHttpServer())
      .delete('/todo/' + uuid)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
