import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfilePhotosService } from './profile-photos.service';
import { CreateProfilePhotoDto } from './dto/create-profile-photo.dto';

@Controller('profile-photos')
export class ProfilePhotosController {
  constructor(private readonly profilePhotosService: ProfilePhotosService) {}

  @Post()
  create(@Body() createProfilePhotoDto: CreateProfilePhotoDto) {
    return this.profilePhotosService.create(createProfilePhotoDto);
  }

  @Get()
  findAll() {
    return this.profilePhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilePhotosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilePhotosService.remove(+id);
  }
}
