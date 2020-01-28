import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto, UserDto } from 'src/users/user.dto';
import { SmsService } from 'src/shared/services/sms.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly smsService: SmsService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @Post('signin')
  @ApiOperation({ description: 'User sign in' })
  @ApiResponse({ description: 'User success sign in', status: HttpStatus.OK })
  @ApiResponse({
    description: 'Wrong credentials',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'Server error during sigin',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async signin(@Body() user: LoginDto, @Res() res: Response) {
    try {
      const { phone, password: lpassword } = user;
      const { password, ...currentUser } = await this.usersService.findUser({
        phone,
      });

      if (!user || (user && !(await bcrypt.compare(lpassword, password)))) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          data: null,
          error: 'Invalid username and/or password',
        });
      }
      return res.status(HttpStatus.OK).json({ data: currentUser, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @Post('signup')
  @ApiOperation({ description: 'User sign up (create user)' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during signup',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async signUp(
    @Body() user: UserDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const { phone } = user;
      const userInDb = await this.usersService.findUser({ phone });
      if (userInDb) {
        return res.status(HttpStatus.CONFLICT).json({
          data: null,
          error: 'Invalid username or email already exists',
        });
      }
      const numberTypeSalt = Number(this.configService.get('SALT') as number);
      const salt = await bcrypt.genSalt(numberTypeSalt);
      const hash: string = await bcrypt.hash(user.password, salt);
      const accessToken = await this.authService.createJWT(user);
      const rn = require('random-number');
      const generator = rn.generator({
        integer: true,
        max: 999999,
        min: 100000,
      });
      const code = generator();
      const newUser = await this.usersService.createUser({
        ...user,
        accessToken,
        code,
        password: hash,
      });
      await this.smsService.sendSms(phone, code);
      delete newUser.password;
      return res.status(HttpStatus.OK).json({ data: accessToken, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('check/code')
  @ApiOperation({ description: 'User checke unique code from sms' })
  @ApiResponse({
    description: 'User success checke unique code from sms',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Wrong unique code',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'Server error during sigin',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line:no-any
  public async checkUnique(@Body() code: any, @Res() res: Response) {
    try {
      const user: UserDto = await this.usersService.findUser(code);
      delete user.password;
      delete user.code;
      return res.status(HttpStatus.OK).json({ data: user, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
