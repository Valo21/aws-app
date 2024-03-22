import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignInDto } from './dto/sign-in.dto';
import { Response, Request } from 'express';
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
  public async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken: string = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 7 * 24 * 60 * 1000),
    });
    return 200;
  }

  @UseGuards(JwtAuthGuard)
  @Get('signout')
  public signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
    });
    return 200;
  }
}
