import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';

@Module({
  controllers: [UserController],
  exports: [UsersService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  providers: [UsersService],
})
export class UsersModule {}
