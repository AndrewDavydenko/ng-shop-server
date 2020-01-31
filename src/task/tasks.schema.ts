import * as mongoose from 'mongoose';

export const taskSchema: mongoose.Schema = new mongoose.Schema({
  category: {
    type: String,
  },
  customer: {
    required: true,
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
  location: {
    type: [],
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
  },
  where: {
    // some Mape coordinates
    required: true,
    type: String,
  },
});
