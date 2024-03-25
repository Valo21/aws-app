import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  password: string;
  image: string;
}
