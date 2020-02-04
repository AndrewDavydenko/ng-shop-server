import { JwtStrategy } from '../auth/jwt.strategy';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { categorySchema } from './categories.schema';

@Module({
  controllers: [CategoriesController],
  exports: [CategoriesService],
  imports: [
    MongooseModule.forFeature([{ name: 'Categories', schema: categorySchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CategoriesService, JwtStrategy],
})
export class CategoriesModule {}
