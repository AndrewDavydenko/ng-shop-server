import { ProductDto } from './products.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Injectable()
export class ProductsService {
  public constructor(
    // tslint:disable-next-line:no-any
    @InjectModel('Products') private readonly productModel: mongoose.Model<any>
  ) {}
  public async createProduct(product: ProductDto): Promise<ProductDto> {
    const createProduct = new this.productModel(product);
    return createProduct.save();
  }
  public async findProdcuts(
    searchByName: string,
    subCat: string,
    prices: string,
    status: boolean
  ): Promise<ProductDto[]> {
    let querySubCat = {};
    if (subCat) {
      querySubCat = { subCategory: new mongoose.Types.ObjectId(subCat) };
    }
    // const querySubCat =
    //   (subCat && { subCategory: Types.ObjectId(subCat) }) || {};
    const queryComparePrices =
      (prices && {
        price: {
          $gt: parseInt(prices.split(',')[0], 10),
          $lt: parseInt(prices.split(',')[1], 10),
        },
      }) ||
      {};
    const queryStatus = (status && { status }) || {};
    return this.productModel.aggregate([
      {
        $match: {
          $and: [
            { name: { $regex: searchByName || '', $options: 'i' } },
            querySubCat,
            queryComparePrices,
            queryStatus,
          ],
        },
      },
      {
        $lookup: {
          as: 'feedbacks',
          foreignField: 'product',
          from: 'feedbacks',
          localField: '_id',
        },
      },
      { $unwind: { path: '$feedbacks', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          description: { $first: '$description' },
          feedbacksCount: {
            $sum: {
              $cond: [{ $ifNull: ['$feedbacks', null] }, 1, 0],
            },
          },
          images: { $first: '$images' },
          name: { $first: '$name' },
          price: { $first: '$price' },
          rating: { $avg: '$feedbacks.rate' },
          status: { $first: '$status' },
          subCategory: { $first: '$subCategory' },
        },
      },
    ]);
  }
  public async findProdcut(_id: string): Promise<ProductDto[]> {
    return this.productModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          as: 'comments',
          foreignField: 'product',
          from: 'feedbacks',
          localField: '_id',
        },
      },
    ]);
  }
  public async updateProduct(
    query: ProductDto,
    _id: number
  ): Promise<ProductDto> {
    return this.productModel.findOneAndUpdate({ id: _id }, query);
  }
  // tslint:disable-next-line: no-any
  public async deleteProduct(_id: string): Promise<any> {
    return this.productModel.remove({ _id }).exec();
  }
}
