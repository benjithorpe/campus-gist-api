import { Schema, model, Types } from 'mongoose';

const gistSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: {
    type: Types.ObjectId,
    required: true,
  },
  comments: [Types.ObjectId],
});

export default model('Gist', gistSchema);
