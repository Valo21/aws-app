import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}
  create(createImageDto: CreateImageDto) {
    return this.imagesRepository.save(createImageDto);
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

  update(id: string, updateImageDto: UpdateImageDto) {
    return this.imagesRepository.update(id, updateImageDto);
  }

  remove(id: string) {
    return this.imagesRepository.delete(id);
  }
}
