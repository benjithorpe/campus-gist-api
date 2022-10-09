const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
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
  gists: [mongoose.Types.ObjectId],

  // gists: {
  //   type: mongoose.Types.ObjectId,
  //   default: [],
  // },
});

module.exports = mongoose.model('Student', studentSchema);
