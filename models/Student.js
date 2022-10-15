import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    min: 4,
    max: 200,
  },
  username: {
    type: String,
    required: true,
    trim: true,
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
    trim: true,
    min: 6,
    max: 255,
  },
  institution: {
    type: String,
    default: 'Other',
    required: true,
    trim: true,
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
  gists: [{ type: Schema.Types.ObjectId, ref: 'Gist' }],
});

export default model('Student', studentSchema);
