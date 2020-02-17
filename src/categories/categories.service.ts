import { CategotyDto } from './categories.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    return this.categoryModel.aggregate([
      {
        $lookup: {
          as: 'subCategories',
          foreignField: 'idCategory',
          from: 'subcategories',
          localField: '_id',
        },
      },
    ]);
  }
}
