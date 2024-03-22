import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/');
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  // TODO: Change this
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
