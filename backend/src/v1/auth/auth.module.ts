import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UploaderService } from '../uploader/uploader.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ProfilePhotosService } from '../profile-photos/profile-photos.service';
import { ProfilePhoto } from '../profile-photos/entities/profile-photo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forFeature([User, ProfilePhoto]),
    JwtModule.register({
      global: true,
      secret: 'Mysecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    UploaderService,
    ProfilePhotosService,
  ],
})
export class AuthModule {}
