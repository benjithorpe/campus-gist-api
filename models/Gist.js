import { Schema, model } from 'mongoose';

const gistSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  // likes: {
  //   type: Number,
  //   default: 0,
  // },
  // likedBy: [Schema.Types.ObjectId],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

export default model('Gist', gistSchema);
