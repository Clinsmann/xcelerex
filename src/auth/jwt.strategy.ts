import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { AuthService } from './auth.service';
interface JWTSignPayload {
  firstName: string;
  lastName: string;
  email: string;
  isActivated?: boolean;
  token?: string;
  [key: string]: any;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JWTSignPayload, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload.email);
    if (!user) return done(new UnauthorizedException(), false);
    return done(null, user, payload.iat);
  }
}
