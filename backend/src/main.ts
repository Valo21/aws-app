import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/');
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://aws-app-bucker.s3-website.us-east-2.amazonaws.com',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
