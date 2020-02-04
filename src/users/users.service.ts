import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
@Injectable()
export class UsersService {
  public constructor(
    // tslint:disable-next-line:no-any
    @InjectModel('User') private readonly userModel: Model<any>
  ) {}

  // tslint:disable-next-line:no-any
  public async findUser(query: any): Promise<any> {
    return this.userModel
      .findOne(query)
      .lean()
      .exec();
  }

  public async createUser(
    user: UserDto & { accessToken: string }
  ): Promise<UserDto> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  // tslint:disable-next-line:no-any
  public async updateUser(query: any, _id: number): Promise<any> {
    return this.userModel.findOneAndUpdate({ id: _id }, query);
  }
  public async findUsers() {
    return this.userModel.find({});
  }
}
