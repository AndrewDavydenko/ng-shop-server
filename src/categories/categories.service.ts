import { CategoryDto } from './categories.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CategoriesService {
  public constructor(
    // tslint:disable-next-line:no-any
    @InjectModel('Categories') private readonly categoryModel: Model<any>,
    // tslint:disable-next-line: no-any
    @InjectModel('SubCategories') private readonly subCategoryModel: Model<any>,
    // tslint:disable-next-line: no-any
    @InjectModel('Products') private readonly productModel: Model<any>
  ) {}
  public async createCategory(category: CategoryDto): Promise<CategoryDto[]> {
    const createCategory = new this.categoryModel(category);
    return createCategory.save();
  }

  // tslint:disable-next-line: no-any
  public async findCategoies(): Promise<any[]> {
    return this.categoryModel.aggregate([
      {
        $lookup: {
          as: 'subCategories',
          foreignField: 'category',
          from: 'subcategories',
          localField: '_id',
        },
      },
      { $unwind: { path: '$subCategories', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          subCategories: { $push: '$subCategories' },
        },
      },
      { $unwind: { path: '$subCategories', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          as: 'products',
          foreignField: 'subCategory',
          from: 'products',
          localField: 'subCategories._id',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          subCategories: {
            $push: {
              _id: '$subCategories._id',
              category: '$subCategories.category',
              name: '$subCategories.name',
              productsCount: { $size: '$products' },
            },
          },
        },
      },
    ]);
  }

  public async deleteCategory(_id: string): Promise<void> {
    const category = await this.categoryModel
      .findOne({ _id: Types.ObjectId(_id) })
      .exec();
    const subCategories = await this.subCategoryModel
      .find({ category: Types.ObjectId(category._id) })
      .lean()
      .exec();
    for (const subCat of subCategories) {
      const products = await this.productModel
        .find({ subCategory: Types.ObjectId(subCat._id) })
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
        _id: Types.ObjectId(subCat._id),
      });
    }
    await this.categoryModel.deleteOne({ _id: Types.ObjectId(_id) });
  }
  public async updateCategory(id: string, name: string) {
    return await this.categoryModel.findOneAndUpdate(
      { _id: Types.ObjectId(id) },
      { $set: { name } }
    );
  }
}
