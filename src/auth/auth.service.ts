import { LoginDto } from './../users/user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  public constructor(private readonly jwtService: JwtService) {}

  // tslint:disable-next-line:no-any
  public async createJWT(user: LoginDto): Promise<string> {
    const payload = { phone: user.phone };
    return this.jwtService.sign(payload);
  }
}
