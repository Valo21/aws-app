import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ProfilePhotosModule } from '../profile-photos/profile-photos.module';
import { UploaderModule } from '../uploader/uploader.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProfilePhotosModule,
    UploaderModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
