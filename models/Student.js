import { Schema, Types, model } from 'mongoose';

const studentSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    min: 4,
    max: 200,
  },
  username: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  image: {
    type: String,
    default: 'default.png',
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  institution: {
    type: String,
    default: 'Other',
    required: true,
  },
  bio: {
    type: String,
    default: 'Simple is better than complex',
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  joined: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  gists: [Types.ObjectId],
});

export default model('Student', studentSchema);
