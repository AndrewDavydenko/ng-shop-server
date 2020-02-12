import * as mongoose from 'mongoose';

export const productSchema: mongoose.Schema = new mongoose.Schema({
  description: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  status: {
    required: true,
    type: Boolean,
  },
});
