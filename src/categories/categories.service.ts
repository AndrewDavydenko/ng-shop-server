import { CategotyDto } from './categories.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubCategotyDto } from './sub-categories.dto';

@Injectable()
export class CategoriesService {
  public constructor(
    // tslint:disable-next-line:no-any
    @InjectModel('Categories') private readonly categoryModel: Model<any>,
    // tslint:disable-next-line: no-any
    @InjectModel('SubCategories') private readonly subCategoryModel: Model<any>
  ) {}
  public async createCategory(category: CategotyDto): Promise<CategotyDto[]> {
    const createCategory = new this.categoryModel(category);
    return createCategory.save();
  }
  public async createSubCategory(
    subCategory: SubCategotyDto
  ): Promise<CategotyDto[]> {
    const createCategory = new this.subCategoryModel(subCategory);
    return createCategory.save();
  }
  // tslint:disable-next-line: no-any
  public async findCategoies(): Promise<any[]> {
    return this.categoryModel
      .find()
      .lean()
      .exec();
  }
  // tslint:disable-next-line:no-any
  public async findSubCategoies(category: string): Promise<any[]> {
    return this.subCategoryModel.aggregate([
      { $match: { category: Types.ObjectId(category) } },
      {
        $lookup: {
          as: 'products',
          foreignField: 'subCategory',
          from: 'products',
          localField: '_id',
        },
      },
      { $unwind: { path: '$products', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          category: { $first: '$category' },
          productsCount: {
            $sum: {
              $cond: [{ $ifNull: ['$products', null] }, 1, 0],
            },
          },
        },
      },
    ]);
  }
}
