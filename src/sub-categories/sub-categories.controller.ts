import { SubCategoriesService } from './sub-categories.service';
import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { SubCategotyDto } from './sub-categories.dto';

@ApiTags('subcategories')
@Controller('subcategories')
export class SubCategoriesController {
  public constructor(private subCategoriesService: SubCategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  @ApiOperation({ description: 'Create new sub category' })
  @ApiResponse({
    description: 'Sub category was successfully created',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async createSubCategory(
    @Body() subCategory: SubCategotyDto,
    @Res() res: Response
  ) {
    try {
      const createdSubCategory = await this.subCategoriesService.createSubCategory(
        subCategory
      );
      return res
        .status(HttpStatus.OK)
        .json({ data: createdSubCategory, error: null });
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
    @Body() subCategory: SubCategotyDto,
    // tslint:disable-next-line:no-any
    @Param() param: any,
    @Res() res: Response
  ) {
    try {
      const updatedSubCategory = await this.subCategoriesService.updateSubCategory(
        param.id,
        subCategory.name
      );
      return res
        .status(HttpStatus.OK)
        .json({ data: updatedSubCategory, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ description: 'Delete sub category by id' })
  @ApiResponse({
    description: 'Sub category deleted successfully',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  // tslint:disable-next-line: no-any
  public async deleteSubCategory(@Res() res: Response, @Param() param: any) {
    try {
      await this.subCategoriesService.deleteSubCategory(param.id);
      return res.status(HttpStatus.OK).json({ data: null, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
