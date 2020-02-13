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
    type: String,
  },
  idUser: {
    required: true,
    type: String,
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
