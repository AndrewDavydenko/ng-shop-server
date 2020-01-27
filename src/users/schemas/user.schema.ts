import * as mongoose from 'mongoose';

export const userSchema: mongoose.Schema = new mongoose.Schema({
  accessToken: {
    type: String,
  },
  address: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  email: {
    required: true,
    type: String,
    unique: false,
  },
  fullName: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    unique: false,
  },
  phone: {
    required: true,
    type: String,
    unique: true,
  },
  unigCode: {
    type: String,
  },
});
