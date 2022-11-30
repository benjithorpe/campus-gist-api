import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  // post: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Gist',
  // },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
});

export default model('Comment', commentSchema);
