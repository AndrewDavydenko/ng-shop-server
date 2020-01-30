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
  @Get('findTasks')
  @ApiOperation({ description: 'User is locking fo tasks' })
  @ApiResponse({
    description: 'Tasks founded successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error  findTasks',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @Post('findTaskById')
  @ApiOperation({ description: 'User is locking fo task by id' })
  @ApiResponse({
    description: 'Task foundById successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during findTaskById',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line:no-any
  public async findTaskById(@Body() request: any, @Res() res: Response) {
    try {
      const { query } = request;
      const task = await this.tasksService.findTaskById(query);
      return res.status(HttpStatus.OK).json({ data: task, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
