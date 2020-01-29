import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  // Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  public async createTask(
    @Body() task: TaskDto
    // @Res() res: Response
    // tslint:disable-next-line:no-any
  ) {
    console.log('task', task);
    try {
      const { taskName } = task;
      console.log(taskName);
      const newTask = await this.tasksService.createTask(task);
      console.log(newTask);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findTasks')
  @ApiOperation({ description: 'User is locking fo task' })
  @ApiResponse({
    description: 'Task found successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during create new task',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findTasks() {
    try {
      const tasks = await this.tasksService.findTasks();
      console.log('finded task', tasks);

      // return res.status().json({ data: tasks, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return;
    }
  }
}
