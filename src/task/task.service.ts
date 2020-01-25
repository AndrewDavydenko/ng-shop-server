import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './task.dto';
@Injectable()
export class TaskService {
  public constructor(
    @InjectModel('Task') private readonly taskModel: Model<any>
  ) {}

  // public async findTaskByName(name: string): Promise<TaskDto> {}
  public async createTask(task: TaskDto): Promise<TaskDto> {
    const createTask = new this.taskModel(task);
    return createTask.save();
  }
}
