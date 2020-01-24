import { ConfigService } from '@nestjs/config';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, UserDto } from './users/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AppController {
  public constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
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
      const {
        password,
        ...userFromDb
      }: UserDto = await this.usersService.findUser(phone);
      if (!user || (user && !(await bcrypt.compare(lpassword, password)))) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          data: null,
          error: 'Invalid username and/or password',
        });
      }
      return res.status(HttpStatus.OK).json({ data: userFromDb, error: null });
    } catch (error) {
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
      const newUser = await this.usersService.createUser({
        ...user,
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
}
