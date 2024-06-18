import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../../../common/constants/constants';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  authService: any;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: LoginDto): Promise<any> {
    const user = await this.authService.validateUser({...payload,provider:'local'});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}