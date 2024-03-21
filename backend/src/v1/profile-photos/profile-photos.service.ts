import { Injectable } from '@nestjs/common';
import { CreateProfilePhotoDto } from './dto/create-profile-photo.dto';
import { UpdateProfilePhotoDto } from './dto/update-profile-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfilePhoto } from './entities/profile-photo.entity';

@Injectable()
export class ProfilePhotosService {
  constructor(
    @InjectRepository(ProfilePhoto)
    private profilePhotoRepository: Repository<ProfilePhoto>,
  ) {}
  async create(createProfilePhotoDto: CreateProfilePhotoDto) {
    return this.profilePhotoRepository.save(createProfilePhotoDto);
  }

  findAll() {
    return `This action returns all profilePhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profilePhoto`;
  }

  update(id: number, updateProfilePhotoDto: UpdateProfilePhotoDto) {
    return `This action updates a #${id} profilePhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} profilePhoto`;
  }
}
