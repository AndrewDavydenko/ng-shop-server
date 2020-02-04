import { UserController } from './user.controller';
import { userSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [UserController],
  exports: [UsersService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  providers: [UsersService],
})
export class UsersModule {}
