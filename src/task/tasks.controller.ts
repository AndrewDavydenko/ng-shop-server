import { FindNearestTasksDto } from './task.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TaskDto } from './task.dto';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  public constructor(private readonly tasksService: TasksService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('createTask')
  @ApiOperation({ description: 'Create new task' })
  @ApiResponse({
    description: 'New task was successfully created',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during create new task',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async createTask(@Body() task: TaskDto, @Res() res: Response) {
    try {
      const newTask = await this.tasksService.createTask(task);
      return res.status(HttpStatus.OK).json({ data: newTask, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('find')
  @ApiOperation({ description: 'User is locking fo task' })
  @ApiResponse({
    description: 'Task founded successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error  find',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line:no-any
  public async findTasks(@Res() res: Response) {
    try {
      const tasks = await this.tasksService.findTasks();
      return res.status(HttpStatus.OK).json({ data: tasks, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('nearest')
  @ApiOperation({ description: 'User is locking fo nearest' })
  @ApiResponse({
    description: 'nearest founded successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error nearest',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line:no-any
  public async findNearestTasks(
    @Body() query: FindNearestTasksDto,
    @Res() res: Response
  ) {
    try {
      const tasks = await this.tasksService.findNearestTasks(query);
      return res.status(HttpStatus.OK).json({ data: tasks, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
