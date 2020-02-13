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
  idProduct: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  limitations: {
    required: true,
    type: String,
  },
  rate: {
    required: true,
    type: Number,
  },
});
