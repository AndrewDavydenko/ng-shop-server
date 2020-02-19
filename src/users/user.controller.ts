import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  public constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  @ApiOperation({ description: 'find Users ' })
  @ApiResponse({
    description: 'find users success',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error findUsers',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findUsers(@Res() res: Response) {
    try {
      const users = await this.usersService.findUsers();
      return res.status(HttpStatus.OK).json({ data: users, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
