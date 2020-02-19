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
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ParseBool } from './parseBool.pipe';
import { ParseInt } from './parseInt.pipe';

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
  @ApiOperation({ description: 'Get products' })
  @ApiResponse({
    description: 'Got Products',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error  find',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findProducts(
    @Res() res: Response,
    @Query('text') searchByName: string,
    @Query('subcategory') subCat: string,
    @Query('price') price: string,
    @Query('status', new ParseBool()) status: boolean,
    @Query('page', new ParseInt()) page: number
  ) {
    try {
      const products = await this.productsService.findProdcuts(
        searchByName,
        subCat,
        price,
        status,
        page
      );
      return res.status(HttpStatus.OK).json({ data: products, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }

  @Get(':id')
  @ApiOperation({ description: 'Get one product by id' })
  @ApiResponse({
    description: 'Got one product by id ',
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
  @ApiOperation({ description: 'Update one product by id' })
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
    @Body() product: ProductDto,
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
  @ApiOperation({ description: 'Delete one product by id' })
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
