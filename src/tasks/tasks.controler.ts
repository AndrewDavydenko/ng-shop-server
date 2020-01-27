import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ description: 'Get all tasks' })
  @ApiResponse({
    description: 'Get tasks success',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during tasks proccessed',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async createTasks(@Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({ data: [], error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
