import { ProductDto } from './products.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  @ApiOperation({ description: 'Create new product' })
  @ApiResponse({
    description: 'New product was successfully created',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during create new product',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async createProduct(
    @Body() product: ProductDto,
    @Res() res: Response
  ) {
    try {
      const createdProduct = await this.productsService.createProduct(product);
      return res
        .status(HttpStatus.OK)
        .json({ data: createdProduct, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @Get('')
  @ApiOperation({ description: 'User is looking for a products' })
  @ApiResponse({
    description: 'Products founded successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error  find',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findProducts(@Res() res: Response) {
    try {
      const products = await this.productsService.findProdcuts();
      return res.status(HttpStatus.OK).json({ data: products, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @Get(':id')
  @ApiOperation({ description: 'User is looking for a product' })
  @ApiResponse({
    description: 'Product founded successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error  find',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line: no-any
  public async findProduct(@Res() res: Response, @Param('id') param: any) {
    try {
      const product = await this.productsService.findProdcut(param);
      return res.status(HttpStatus.OK).json({ data: product, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ description: 'Updute product' })
  @ApiResponse({
    description: ' Update product success',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line:no-any
  public async updateProduct(
    // tslint:disable-next-line:no-any
    @Param('id') param: any,
    // tslint:disable-next-line:no-any
    @Body() product: any,
    @Res() res: Response
  ) {
    try {
      const updatedProduct = await this.productsService.updateProduct(
        product,
        param
      );
      return res
        .status(HttpStatus.OK)
        .json({ data: updatedProduct, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ description: 'Delete product' })
  @ApiResponse({
    description: ' Delete product success',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line:no-any
  public async deleteProduct(
    // tslint:disable-next-line:no-any
    @Param('id') param: any,
    // tslint:disable-next-line:no-any
    @Res() res: Response
  ) {
    try {
      await this.productsService.deleteProduct(param);
      return res.status(HttpStatus.OK).json({ data: 'success', error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
