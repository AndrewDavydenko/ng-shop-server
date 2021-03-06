import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto, UserDto } from 'src/users/user.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public imgBase64: string | undefined;
  public constructor(
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
  public async signin(@Body() query: LoginDto, @Res() res: Response) {
    try {
      const { username, password } = query;
      const user = await this.usersService.findUser({
        username,
      });

      if (!user || (user && !(await bcrypt.compare(password, user.password)))) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          data: null,
          error: 'Invalid username and/or password',
        });
      }
      return res.status(HttpStatus.OK).json({ data: user, error: null });
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
  @UseInterceptors(FileInterceptor('avatar'))
  public async signUp(
    @Body() user: UserDto,
    @Res() res: Response,
    @UploadedFile() avatar: Buffer
  ): Promise<Response> {
    try {
      const { username } = user;
      const userInDb = await this.usersService.findUser({ username });
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
      if (avatar) {
        this.imgBase64 = Buffer.from(avatar.buffer).toString('base64');
      } else {
        this.imgBase64 = '';
      }
      const newUser = await this.usersService.createUser({
        ...user,
        accessToken,
        password: hash,
      });
      delete newUser.password;
      return res.status(HttpStatus.OK).json({ data: accessToken, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
