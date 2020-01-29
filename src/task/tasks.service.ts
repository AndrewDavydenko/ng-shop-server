import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './task.dto';
@Injectable()
export class TasksService {
  public constructor(
    // tslint:disable-next-line:no-any
    @InjectModel('Tasks') private readonly taskModel: Model<any>
  ) {}

  // public async findTaskByName(name: string): Promise<TaskDto> {}
  public async createTask(task: TaskDto): Promise<TaskDto> {
    const createTask = new this.taskModel(task);
    return createTask.save();
  }
  public async findTasks(): Promise<any> {
    return this.taskModel
      .find()
      .lean()
      .exec();
  }
}
