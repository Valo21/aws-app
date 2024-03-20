import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UploaderService } from '../uploader/uploader.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album, User])],
  controllers: [AlbumsController],
  providers: [AlbumsService, UsersService, UploaderService],
})
export class AlbumsModule {}
