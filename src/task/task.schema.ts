import * as mongoose from 'mongoose';

export const taskSchema: mongoose.Schema = new mongoose.Schema({
  castomer: {
    required: true,
    type: String,
  },
  category: {
    type: String,
  },
  endDate: {
    required: true,
    type: Date,
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
    type: Date,
  },
  taskName: {
    required: true,
    type: String,
  },
  where: {
    // some Mape coordinates
    required: true,
    type: String,
  },
});
