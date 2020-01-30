import { TaskController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { taskSchema } from './tasks.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TaskController],
  exports: [TasksService],
  imports: [
    MongooseModule.forFeature([{ name: 'Tasks', schema: taskSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [TasksService, JwtStrategy],
})
export class TasksModule {}
