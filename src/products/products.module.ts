import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { productSchema } from './products.schema';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  exports: [ProductsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: productSchema }]),
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
