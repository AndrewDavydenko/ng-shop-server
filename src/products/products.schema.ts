import * as mongoose from 'mongoose';

export const productSchema: mongoose.Schema = new mongoose.Schema({
  description: {
    required: true,
    type: String,
  },
  images: { required: false, type: Array },
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
  subCategory: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
});
