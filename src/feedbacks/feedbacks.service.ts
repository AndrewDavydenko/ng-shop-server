import { FeedbackDto } from './feedbacks.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class FeedbacksService {
  public constructor(
    // tslint:disable-next-line: no-any
    @InjectModel('Feedbacks') private readonly feedbackModel: Model<any>
  ) {}
  public async createFeedback(feedback: FeedbackDto): Promise<FeedbackDto> {
    const createFeedback = new this.feedbackModel(feedback);
    return createFeedback.save();
  }
  // tslint:disable-next-line: no-any
  public async getFeedbacks(idProduct: string): Promise<any> {
    return await this.feedbackModel
      .find({ idProduct })
      .lean()
      .exec();
  }
}
