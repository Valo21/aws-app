import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UploaderService } from '../uploader/uploader.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {ProfilePhotosService} from "../profile-photos/profile-photos.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private uploaderService: UploaderService,
    private jwtService: JwtService,
  ) {}

  public async signUp(
    createUserDto: CreateUserDto,
    image: Express.Multer.File,
  ) {
    const existingUser: User = await this.userService.findOneByUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new HttpException('Username already in use', HttpStatus.CONFLICT);
    }

    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      bcrypt.genSaltSync(10),
    );
    createUserDto.image = await this.uploaderService.uploadProfileImage(
      createUserDto.username,
      image.originalname,
      image.buffer,
    );

    const newUser = await this.userService.create(createUserDto);

    return {
      id: newUser.id,
    };
  }

  public async signIn(username: string, password: string): Promise<string> {
    const user: User = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ...payload } = user;

    return this.jwtService.sign(payload);
  }
}
