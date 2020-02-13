import { FeedbacksService } from './feedbacks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { feedbackSchema } from './feedbacks.schema';
import { FeedbacksController } from './feedbacks.controller';

@Module({
  controllers: [FeedbacksController],
  exports: [FeedbacksService],
  imports: [
    MongooseModule.forFeature([{ name: 'Feedbacks', schema: feedbackSchema }]),
  ],
  providers: [FeedbacksService, JwtStrategy],
})
export class FeedbacksModule {}
