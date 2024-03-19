import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}
  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumRepository.save(createAlbumDto);
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
