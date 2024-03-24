import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignInDto } from './dto/sign-in.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public getAuthUser(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('image'))
  public signUp(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.authService.signUp(createUserDto, image);
  }

  @Post('signin')
  public async signIn(@Body() signInDto: SignInDto) {
    const accessToken = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return {
      accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('signout')
  public signOut(@Req() req: Express.Request) {
    req.session.accessToken = null;
    return 200;
  }
}
