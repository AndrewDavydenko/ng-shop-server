import * as mongoose from 'mongoose';

export const userSchema: mongoose.Schema = new mongoose.Schema({
  accessToken: {
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
});
