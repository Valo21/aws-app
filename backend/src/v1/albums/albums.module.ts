import {forwardRef, Module} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { ImagesModule } from '../images/images.module';
import { UsersModule } from '../users/users.module';
import { UploaderModule } from '../uploader/uploader.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => ImagesModule),
    UsersModule,
    UploaderModule,
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [TypeOrmModule, AlbumsService],
})
export class AlbumsModule {}
