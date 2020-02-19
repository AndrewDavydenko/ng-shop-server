import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubCategotyDto } from './sub-categories.dto';

@Injectable()
export class SubCategoriesService {
  public constructor(
    // tslint:disable-next-line:no-any
    @InjectModel('SubCategories') private readonly subCategoryModel: Model<any>,
    // tslint:disable-next-line: no-any
    @InjectModel('Products') private readonly productModel: Model<any>
  ) {}

  public async createSubCategory(
    subCategory: SubCategotyDto
  ): Promise<SubCategotyDto[]> {
    const createCategory = new this.subCategoryModel(subCategory);
    return createCategory.save();
  }

  public async deleteSubCategory(_id: string): Promise<void> {
    const subCategory = await this.subCategoryModel
      .findOne({ _id: Types.ObjectId(_id) })
      .lean()
      .exec();
    const products = await this.productModel
      .find({ subCategory: Types.ObjectId(subCategory._id) })
      .lean()
      .exec();
    products.forEach(async product => {
      await this.productModel.findOneAndUpdate(
        {
          _id: Types.ObjectId(product._id),
        },
        {
          $set: {
            subCategory: Types.ObjectId('5e4d5c9f83e4e061d0d2f1b3'),
          },
        }
      );
    });
    await this.subCategoryModel.deleteOne({
      _id: Types.ObjectId(subCategory._id),
    });
  }

  public async updateSubCategory(id: string, name: string) {
    await this.subCategoryModel.findOneAndUpdate(
      { _id: Types.ObjectId(id) },
      { $set: { name } }
    );
  }
}
