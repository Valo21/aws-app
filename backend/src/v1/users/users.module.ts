import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UploaderService } from '../uploader/uploader.service';
import {ProfilePhotosService} from "../profile-photos/profile-photos.service";
import {ProfilePhoto} from "../profile-photos/entities/profile-photo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, ProfilePhoto])],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, UploaderService, ProfilePhotosService],
})
export class UsersModule {}
