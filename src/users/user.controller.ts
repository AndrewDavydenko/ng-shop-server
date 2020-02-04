import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  public constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  @ApiOperation({ description: 'update user ' })
  @ApiResponse({
    description: 'update user success',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error update user',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line:no-any
  public async updateUser(
    // tslint:disable-next-line:no-any
    @Body() query: any,
    // tslint:disable-next-line:no-any
    @Param('id') param: any,
    @Res() res: Response
  ) {
    try {
      const updatedUser = await this.usersService.updateUser(query, param.id);
      return res.status(HttpStatus.OK).json({ data: updatedUser, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findUsers')
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
