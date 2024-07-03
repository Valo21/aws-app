import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;
}
