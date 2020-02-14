import { JwtStrategy } from './../auth/jwt.strategy';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categoriesSchema, subCategoriesSchema } from './categories.schema';

@Module({
  controllers: [CategoriesController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Categories', schema: categoriesSchema },
      { name: 'SubCategories', schema: subCategoriesSchema },
    ]),
  ],
  providers: [CategoriesService, JwtStrategy],
})
export class CategoriesModule {}
