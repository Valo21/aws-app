import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  album: string;
}
