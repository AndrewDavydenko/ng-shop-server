import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './task.dto';
@Injectable()
export class TasksService {
  public skip: number | undefined;
  public pageValue: number | undefined;
  public constructor(
    // tslint:disable-next-line:no-any
    @InjectModel('Tasks') private readonly taskModel: Model<any>
  ) {}

  public async createTask(task: TaskDto): Promise<TaskDto> {
    const createTask = new this.taskModel(task);

    return createTask.save();
  }
  // tslint:disable-next-line:no-any
  public async findTasks(): Promise<any> {
    return this.taskModel
      .find()
      .lean()
      .exec();
  }
  // tslint:disable-next-line:no-any
  public async findNearestTasks(query: any): Promise<any> {
    const { radius, location } = query;
    let checkedRadius: number;
    if (radius) {
      checkedRadius = radius;
    } else {
      checkedRadius = 1000;
    }
    return this.taskModel.find({
      location: {
        $near: {
          $geometry: {
            coordinates: location,
            type: 'Point',
          },
          $maxDistance: checkedRadius,
        },
      },
    });
  }
  public async getCounter(day: boolean = false) {
    const today = new Date();
    const data = day
      ? this.taskModel.find({
          startDate: {
            $gte: today.getTime(),

            $lte: today.setDate(today.getDate() + 1),
          },
        })
      : await this.findTasks();
    // console.log(data);
    return data;
  }
  // tslint:disable-next-line:no-any
  public async findClosestTasks(page: any): Promise<any> {
    const paginationParams = this.paginator(page, 10);
    const today = new Date();
    const data = this.taskModel.find({
      startDate: {
        $gte: today.getTime(),

        $lte: today.setDate(today.getDate() + 1),
      },
    });
    return data.skip(paginationParams.skip).limit(paginationParams.limitation);
  }

  // tslint:disable-next-line:no-any
  public paginator(page: any, limit: number = 10) {
    page
      ? (this.pageValue = Number(Object.keys(page)[0]))
      : (this.pageValue = 0);
    // tslint:disable-next-line:use-isnan
    if (
      !Number(Object.keys(page)[0]) ||
      this.pageValue === 0 ||
      this.pageValue === 1
    ) {
      this.skip = 0;
    } else {
      this.skip = (this.pageValue - 1) * 10;
    }
    return { skip: this.skip, limitation: limit };
  }
}
