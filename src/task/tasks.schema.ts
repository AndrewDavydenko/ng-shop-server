import * as mongoose from 'mongoose';

export const taskSchema: mongoose.Schema = new mongoose.Schema({
  castomer: {
    required: true,
    type: String,
  },
  category: {
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  equipment: {
    type: String,
  },
  exequtor: {
    required: true,
    type: String,
  },
  rate: {
    required: true,
    type: Number,
  },
  startDate: {
    required: true,
    type: String,
  },
  taskName: {
    required: true,
    type: String,
    unique: true,
  },
  where: {
    // some Mape coordinates
    required: true,
    type: String,
  },
});
