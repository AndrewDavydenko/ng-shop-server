import { FeedbackDto } from './feedbacks.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { FeedbacksService } from './feedbacks.service';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  public constructor(private readonly feedbacksService: FeedbacksService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  @ApiOperation({ description: 'Create new feedback' })
  @ApiResponse({
    description: 'Feedback was successfully created',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during create new product',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async createFeedback(
    @Body() feedback: FeedbackDto,
    @Res() res: Response
  ) {
    try {
      const createdFeedback = await this.feedbacksService.createFeedback(
        feedback
      );
      return res
        .status(HttpStatus.OK)
        .json({ data: createdFeedback, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':idProduct')
  @ApiOperation({ description: 'Create new feedback' })
  @ApiResponse({
    description: 'Feedback was successfully created',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error during create new product',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async getFeedbacks(
    // tslint:disable-next-line: no-any
    @Param('idProduct') param: any,
    @Res() res: Response
  ) {
    try {
      const feedbacks = await this.feedbacksService.getFeedbacks(param);
      return res.status(HttpStatus.OK).json({ data: feedbacks, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
