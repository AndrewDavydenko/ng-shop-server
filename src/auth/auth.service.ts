import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  public constructor(private readonly jwtService: JwtService) {}

  // tslint:disable-next-line:no-any
  public async createJWT(user: any): Promise<string> {
    const payload = { username: user.username };
    return this.jwtService.sign(payload);
  }
}
