import { CategoryDto } from './categories.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { Response } from 'express';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  public constructor(private readonly categoriesService: CategoriesService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('find')
  @ApiOperation({ description: 'User is locking fo categories' })
  @ApiResponse({
    description: 'categories founded successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error find categories',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line:no-any
  public async findClosestTasks(@Body() query: any, @Res() res: Response) {
    try {
      const categories = await this.categoriesService.findCategories(query);
      return res.status(HttpStatus.OK).json({ data: categories, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiOperation({ description: 'User create category' })
  @ApiResponse({
    description: 'create category successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error create category',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line:no-any
  public async createCategory(
    @Body() query: CategoryDto,
    @Res() res: Response
  ) {
    try {
      const category = await this.categoriesService.createCategory(query);
      return res.status(HttpStatus.OK).json({ data: category, error: null });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
