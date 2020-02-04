import * as mongoose from 'mongoose';

export const categorySchema: mongoose.Schema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
});
