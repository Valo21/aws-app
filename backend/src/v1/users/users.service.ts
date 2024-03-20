import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UploaderService } from '../uploader/uploader.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private uploaderService: UploaderService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    image: Express.Multer.File | null,
  ): Promise<UpdateResult> {
    const user: User = await this.findOne(id);
    if (!bcrypt.compareSync(updateUserDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    delete updateUserDto.password;

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser: User = await this.findOneByUsername(
        updateUserDto.username,
      );
      if (existingUser) {
        throw new HttpException('Username already in use', HttpStatus.CONFLICT);
      }
    }

    if (image) {
      updateUserDto.image = await this.uploaderService.uploadProfileImage(
        user.username,
        image.originalname,
        image.buffer,
      );
    }
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  async getAlbums(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['albums', 'albums.images'],
    });
    return user.albums;
  }

  async getProfileImages() {
    // TODO: ADD THIS FUNCTIONALITY
  }
}
