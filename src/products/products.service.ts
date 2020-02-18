import { ProductDto } from './products.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
@Injectable()
export class ProductsService {
  public constructor(
    // tslint:disable-next-line:no-any
    @InjectModel('Products') private readonly productModel: Model<any>
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
    const querySubCat =
      (subCat && { idSubCategory: new Types.ObjectId(subCat) }) || {};
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
          foreignField: 'idProduct',
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
          idSubCategory: { $first: '$idSubCategory' },
          images: { $first: '$images' },
          name: { $first: '$name' },
          price: { $first: '$price' },
          rating: { $avg: '$feedbacks.rate' },
          status: { $first: '$status' },
        },
      },
    ]);
  }
  public async findProdcut(_id: string): Promise<ProductDto[]> {
    return this.productModel.aggregate([
      { $match: { _id: new Types.ObjectId(_id) } },
      {
        $lookup: {
          as: 'comments',
          foreignField: 'idProduct',
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
