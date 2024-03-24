import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as process from "process";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.session.accessToken) {
      return req.session.accessToken;
    }
    return null;
  }

  async validate(payload: any): Promise<Partial<User>> {
    if (!payload) {
      return null;
    }

    const user = await this.usersService.findOne(payload.id);
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      image: user.image,
    };
  }
}
