import { Router } from 'express';

import Gist from '../models/Gist.js';

const router = Router();

// Get all gists
router.get('/', async (req, res) => {
  const gists = await Gist.find()
    .populate('author', 'fullname username image email')
    .sort('-datePosted');

  if (!gists) return res.send({ error: 'No gists found' });

  res.send(gists);
});

// Create new gist
router.post('/', async (req, res) => {
  const gist = new Gist(req.body);

  // TODO: get the current author and save it as the gist's author

  try {
    const saved = await gist.save();
    res.send(saved);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a gist
router.get('/:id', async (req, res) => {
  const gist = await Gist.findById(req.params.id)
    .populate('author', 'fullname username image email')
    .populate('comments');

  // Return Error if no gist was found...
  if (!gist) return res.send({ error: 'Gist was not found' });

  res.send(gist);
});

// Update gist
router.put('/:id', async (req, res) => {
  const gist = await Gist.findById(req.params.id).populate(
    'author',
    'fullname username image',
  );

  if (!gist) return res.send({ error: 'No gist was found.' });
  // Get the content from the request body
  const { content } = req.body;

  // Update the gist conyent
  if (content) gist.content = content;

  try {
    const saved = await gist.save();
    res.send(saved);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete gist
router.delete('/:id', async (req, res) => {
  try {
    await Gist.deleteOne({ _id: req.params.id });
    res.send({ message: 'Gist was deleted...' });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
