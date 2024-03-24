import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('v1/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Express.Request,
  ) {
    return await this.imagesService.create(createImageDto, image, req.user.id);
  }

  @Get()
  async findAll() {
    return await this.imagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.imagesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.imagesService.remove(id);
  }
}
