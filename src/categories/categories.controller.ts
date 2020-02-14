import { CategotyDto } from './categories.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { Response } from 'express';
import { SubCategotyDto } from './sub-categories.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  public constructor(private categoriesService: CategoriesService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  @ApiOperation({ description: 'Create new category' })
  @ApiResponse({
    description: 'Category was successfully created',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during create new product',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async createCategory(
    @Body() category: CategotyDto,
    @Res() res: Response
  ) {
    try {
      await this.categoriesService.createCategory(category);
      return res
        .status(HttpStatus.OK)
        .json({ data: 'Category created', error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('sub')
  @ApiOperation({ description: 'Create new sub category' })
  @ApiResponse({
    description: 'Sub category was successfully created',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during create new product',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async createSubCategory(
    @Body() subCategory: SubCategotyDto,
    @Res() res: Response
  ) {
    try {
      await this.categoriesService.createSubCategory(subCategory);
      return res
        .status(HttpStatus.OK)
        .json({ data: 'Category created', error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }

  @Get('')
  @ApiOperation({ description: 'Categories' })
  @ApiResponse({
    description: 'Categories founded successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error find',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line: no-any
  public async findProduct(@Res() res: Response) {
    try {
      const categories = await this.categoriesService.findCategoies();
      return res.status(HttpStatus.OK).json({ data: categories, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
