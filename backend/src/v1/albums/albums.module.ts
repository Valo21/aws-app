import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UploaderService } from '../uploader/uploader.service';
import {ImagesService} from "../images/images.service";
import { Image } from "../images/entities/image.entity";
import {ImagesModule} from "../images/images.module";

@Module({
  imports: [ImagesModule, TypeOrmModule.forFeature([Image, Album, User])],
  controllers: [AlbumsController],
  providers: [AlbumsService, UsersService, ImagesService, UploaderService],
})
export class AlbumsModule {}
