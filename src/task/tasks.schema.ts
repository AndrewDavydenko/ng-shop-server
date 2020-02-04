import * as mongoose from 'mongoose';

export const taskSchema: mongoose.Schema = new mongoose.Schema({
  category: {
    type: [],
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
  name: {
    required: true,
    type: String,
  },
  rate: {
    required: true,
    type: Number,
  },
  startDate: {
    required: true,
    type: Number,
  },
});
export const taskUpdateSchema: mongoose.Schema = new mongoose.Schema({
  query: {
    type: Object,
  },
  set: {
    type: Object,
  },
});
