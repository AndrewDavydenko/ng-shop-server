import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { productSchema } from './products.schema';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  exports: [ProductsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: productSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ProductsService, JwtStrategy],
})
export class ProductsModule {}
