import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.ORIGIN,
    methods: 'GET,POST,PATCH,DELETE',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
