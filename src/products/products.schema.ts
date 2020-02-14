import * as mongoose from 'mongoose';

export const productSchema: mongoose.Schema = new mongoose.Schema({
  description: {
    required: true,
    type: String,
  },
  idSubCategory: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
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
