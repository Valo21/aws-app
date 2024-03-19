import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('v1/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  async create(@Body() createImageDto: CreateImageDto) {
    return await this.imagesService.create(createImageDto);
  }

  @Get()
  async findAll() {
    return await this.imagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.imagesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return await this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.imagesService.remove(id);
  }
}
