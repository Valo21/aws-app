import {forwardRef, Module} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { AlbumsService } from '../albums/albums.service';
import { Album } from '../albums/entities/album.entity';
import { UsersModule } from '../users/users.module';
import { UploaderModule } from '../uploader/uploader.module';
import { ProfilePhotosModule } from '../profile-photos/profile-photos.module';
import {AlbumsModule} from "../albums/albums.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    AlbumsModule,
    UsersModule,
    UploaderModule,
    ProfilePhotosModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [TypeOrmModule, ImagesService],
})
export class ImagesModule {}
