import * as mongoose from 'mongoose';

export const feedbackSchema: mongoose.Schema = new mongoose.Schema({
  advantages: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  limitations: {
    required: true,
    type: String,
  },
  product: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  rate: {
    required: true,
    type: Number,
  },
});
