import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { taskSchema } from './task.schema';

@Module({
  exports: [TaskService],
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: taskSchema }])],
  providers: [TaskService],
})
export class ProductModul {}
