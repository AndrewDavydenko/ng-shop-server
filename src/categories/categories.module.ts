import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categoriesSchema } from './categories.schema';
import { productSchema } from 'src/products/products.schema';
import { subCategoriesSchema } from 'src/sub-categories/sub-categories.schema';

@Module({
  controllers: [CategoriesController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Categories', schema: categoriesSchema },
      { name: 'SubCategories', schema: subCategoriesSchema },
      { name: 'Products', schema: productSchema },
    ]),
  ],
  providers: [CategoriesService],
})
export class CategoriesModule {}
