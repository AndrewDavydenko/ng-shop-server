import { CategoryDto } from './categories.dto';
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
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { Response } from 'express';

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
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async createCategory(
    @Body() category: CategoryDto,
    @Res() res: Response
  ) {
    try {
      const newCategory = await this.categoriesService.createCategory(category);
      return res.status(HttpStatus.OK).json({ data: newCategory, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  @ApiOperation({
    description: 'Get categories with subcategories and product count',
  })
  @ApiResponse({
    description: 'Got categories with subcategories and product count',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line: no-any
  public async findCategories(@Res() res: Response) {
    try {
      const categories = await this.categoriesService.findCategoies();
      return res.status(HttpStatus.OK).json({ data: categories, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ description: 'Update sub category by id' })
  @ApiResponse({
    description: 'Sub category was successfully updated',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async updateSubCategory(
    @Body() category: CategoryDto,
    // tslint:disable-next-line:no-any
    @Param() param: any,
    @Res() res: Response
  ) {
    try {
      const updatedCategory = await this.categoriesService.updateCategory(
        param.id,
        category.name
      );
      return res
        .status(HttpStatus.OK)
        .json({ data: updatedCategory, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ description: 'Delete category by id' })
  @ApiResponse({
    description: 'Category deleted successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error find',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line: no-any
  public async deleteCategory(@Res() res: Response, @Param() param: any) {
    try {
      await this.categoriesService.deleteCategory(param.id);
      return res.status(HttpStatus.OK).json({ data: null, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
