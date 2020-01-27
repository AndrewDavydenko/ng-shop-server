import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(configService: ConfigService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRETE'),
    });
  }

  // tslint:disable-next-line:no-any
  public async validate(_payload: { phone: string }) {
    // TODO SHOULD CHECK IN DB
    return null;
    // { phone: payload.phone };
  }
}
