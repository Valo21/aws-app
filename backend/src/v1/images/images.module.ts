import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { AlbumsService } from '../albums/albums.service';
import { UploaderService } from '../uploader/uploader.service';
import { Album } from '../albums/entities/album.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Album, User])],
  controllers: [ImagesController],
  providers: [ImagesService, AlbumsService, UploaderService, UsersService],
})
export class ImagesModule {}
