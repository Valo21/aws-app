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
import {ProfilePhotosService} from "../profile-photos/profile-photos.service";
import {ProfilePhoto} from "../profile-photos/entities/profile-photo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Image, Album, User, ProfilePhoto])],
  controllers: [ImagesController],
  providers: [ImagesService, AlbumsService, UploaderService, UsersService, ProfilePhotosService],
})
export class ImagesModule {}
