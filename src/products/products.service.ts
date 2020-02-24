import { ProductDto } from './products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
export class ProductsService {
  private readonly limit: number = 20;

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
    status: boolean,
    page: number
  ): Promise<ProductDto[]> {
    const skip = ((page || 1) - 1) * this.limit;
    let querySubCat = {};
    if (subCat) {
      querySubCat = { subCategory: new Types.ObjectId(subCat) };
    }
    let queryComparePrices = {};
    if (prices) {
      queryComparePrices = {
        price: {
          $gt: parseInt(prices.split(',')[0], 10),
          $lt: parseInt(prices.split(',')[1], 10),
        },
      };
    }
    let queryStatus = {};
    if (status) {
      queryStatus = { status };
    }
    return this.productModel
      .aggregate([
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
            feedbacks: {$first: '$feedbacks'},
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
      ])
      .skip(skip)
      .limit(this.limit);
  }
  public async findProdcut(_id: string): Promise<ProductDto[]> {
    return (
      this.productModel
        .aggregate([
          { $match: { _id: Types.ObjectId(_id) } },
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
        ])
        // tslint:disable-next-line:no-any
        .then((res: any) => {
          return res[0]; // TODO: REWORK IT
        })
    );
  }
  public async updateProduct(
    query: ProductDto,
    _id: number
  ): Promise<ProductDto> {
    return this.productModel.findOneAndUpdate({ id: _id }, query);
  }
  // tslint:disable-next-line: no-any
  public async deleteProduct(_id: string): Promise<any> {
    return this.productModel.remove({ _id: Types.ObjectId(_id) }).exec();
  }
}
