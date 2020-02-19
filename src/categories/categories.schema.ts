import * as mongoose from 'mongoose';

export const categoriesSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
});
