import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  create(createAlbumDto: CreateAlbumDto) {
    return createAlbumDto;
  }

  findAll() {
    return `This action returns all albums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return [id, updateAlbumDto];
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
