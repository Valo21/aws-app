import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { UploaderService } from '../uploader/uploader.service';
import { AlbumsService } from '../albums/albums.service';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private uploaderService: UploaderService,
    private albumsService: AlbumsService,
  ) {}

  async create(
    createImageDto: CreateImageDto,
    image: Express.Multer.File,
    userId: string,
  ) {
    const url: string = await this.uploaderService.uploadImage(
      image.originalname,
      image.buffer,
    );

    let album: Album = await this.albumsService.findOneByName(
      createImageDto.album,
      userId,
    );

    if (!album) {
      album = await this.albumsService.create(createImageDto.album, userId);
    }

    const imageEntity: Image = await this.imagesRepository.save({
      name: createImageDto.name,
      url,
      album,
    });
    return imageEntity;
  }

  findAll(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  findOne(id: string) {
    return this.imagesRepository.findOne({
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.imagesRepository.delete(id);
  }
}
