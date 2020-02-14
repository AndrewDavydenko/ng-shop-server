import * as mongoose from 'mongoose';

export const categoriesSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
});
export const subCategoriesSchema: mongoose.Schema = new mongoose.Schema({
  idCategory: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    required: true,
    type: String,
  },
});
