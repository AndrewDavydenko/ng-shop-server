import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { tasksSchema } from './tasks.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tasks', schema: tasksSchema }]),
  ],
})
export class TasksModule {}
