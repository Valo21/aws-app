import { Module } from '@nestjs/common';
import { ProfilePhotosService } from './profile-photos.service';
import { ProfilePhotosController } from './profile-photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilePhoto } from './entities/profile-photo.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ProfilePhoto])],
  controllers: [ProfilePhotosController],
  providers: [ProfilePhotosService],
  exports: [TypeOrmModule, ProfilePhotosService],
})
export class ProfilePhotosModule {}
