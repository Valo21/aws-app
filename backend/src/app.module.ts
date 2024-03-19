import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './v1/users/users.module';
import { ImagesModule } from './v1/images/images.module';
import { AlbumsModule } from './v1/albums/albums.module';
import * as process from 'process';
import { User } from './v1/users/entities/user.entity';
import { Album } from './v1/albums/entities/album.entity';
import { Image } from './v1/images/entities/image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.env.NODE_ENV}.env`],
    }),
    UsersModule,
    ImagesModule,
    AlbumsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      ssl: process.env.NODE_ENV !== 'dev',
      synchronize: true,
      logging: 'all',
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
