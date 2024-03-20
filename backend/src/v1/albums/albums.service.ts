import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private usersService: UsersService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumRepository.save(createAlbumDto);
  }

  async findOneByName(name: string, userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }
    return await this.albumRepository.findOne({
      where: {
        name,
      },
      loadRelationIds: {
        relations: [userId],
      },
    });
  }

  findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  findOne(id: string) {
    return this.albumRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<UpdateResult> {
    return this.albumRepository.update(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.albumRepository.delete(id);
  }
}
