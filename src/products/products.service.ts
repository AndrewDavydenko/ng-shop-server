import { ProductDto } from './products.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  public async findProdcuts(): Promise<ProductDto[]> {
    return this.productModel
      .find()
      .lean()
      .exec();
  }
  public async findProdcut(_id: string): Promise<ProductDto[]> {
    return this.productModel
      .findOne({ _id })
      .lean()
      .exec();
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
