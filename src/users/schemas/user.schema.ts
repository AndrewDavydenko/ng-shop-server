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
    type: Date,
  },
  code: {
    type: Number,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
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
});
