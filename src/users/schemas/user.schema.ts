import * as mongoose from 'mongoose';

export const userSchema: mongoose.Schema = new mongoose.Schema({
  accessToken: {
    type: String,
  },
  address: {
    type: String,
  },
  avatar: {
    type: String,
  },
  birthday: {
    type: String,
  },
  code: {
    type: Number,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  fullName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
    unique: true,
  },
});
