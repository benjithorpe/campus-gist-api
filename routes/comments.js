import { Router } from 'express';
import auth from '../middlewares/auth.js';

import Comment from '../models/Comments.js';

const router = Router();

// Get all comments
router.get('/', async (req, res) => {
  const comment = await Comment.find()
    .populate('author', 'username image')
    .sort('-datePosted');

  if (!comment) return res.send({ error: 'No comments found' });

  res.send(comment);
});

// Create new comment
router.post('/', auth, async (req, res) => {
  const comment = new Comment(req.body);

  // TODO: get the current author and save it as the gist's author
  try {
    const saved = await comment.save();
    res.send(saved);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a comment
// router.get('/:id', async (req, res) => {
//   const gist = await Comment.findById(req.params.id).populate(
//     'author',
//     'fullname username image',
//   );

//   // Return Error if no gist was found...
//   if (!gist) return res.send({ error: 'Gist was not found' });

//   res.send(gist);
// });

// Delete comment
router.delete('/:id', auth, async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.id });
    res.send({ message: 'Comment was deleted...' });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
