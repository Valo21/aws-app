import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './v1/users/users.module';
import { ImagesModule } from './v1/images/images.module';
import { AlbumsModule } from './v1/albums/albums.module';
import * as process from 'process';
import { AuthModule } from './v1/auth/auth.module';
import { UploaderModule } from './v1/uploader/uploader.module';
import { ProfilePhotosModule } from './v1/profile-photos/profile-photos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    UsersModule,
    AlbumsModule,
    ImagesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      ssl: false,
      synchronize: true,
      logging: 'all',
      autoLoadEntities: true,
    }),
    AuthModule,
    UploaderModule,
    ProfilePhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
