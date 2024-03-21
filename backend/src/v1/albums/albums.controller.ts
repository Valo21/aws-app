import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('v1/albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Express.Request, @Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto.name, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }
}
