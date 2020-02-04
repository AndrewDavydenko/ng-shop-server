import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  public constructor(
    // tslint:disable-next-line:no-any
    @InjectModel('Categories') private readonly categoryModel: Model<any>
  ) {}
  // tslint:disable-next-line:no-any
  public async findCategories(query: number): Promise<any> {
    return this.categoryModel.find(query);
  }
  public async createCategory(query: CategoryDto): Promise<string> {
    const newCategory = new this.categoryModel(query);
    return newCategory.save();
  }
}
