import { AuthService } from './auth/auth.service';
import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  HttpStatus,
  //   Post,
  //   Res,
  //   UseGuards,
  //   Get,
} from '@nestjs/common';
import { Response } from 'express';
// import * as bcrypt from 'bcrypt';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { LoginDto, UserDto } from './users/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@ApiTags('tasks')
@Controller('tasks')
export class AppController {
  public constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @Get('task')
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
    @Body() task: T,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const { phone } = user;
      const userInDb = await this.usersService.findUser(phone);
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
      const newUser = await this.usersService.createUser({
        ...user,
        accessToken,
        password: hash,
      });
      delete newUser.password;
      return res.status(HttpStatus.OK).json({ data: newUser, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  public getProfile() {
    return 'goood request';
  }
}
