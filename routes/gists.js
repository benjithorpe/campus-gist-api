import { Router } from 'express';

import Gist from '../models/Gist.js';

const router = Router();

// Get all gists
router.get('/', async (req, res) => {
  const gists = await Gist.find();

  if (!gists) return res.send({ error: 'No gists found' });

  res.send({ gists });
});

// Create new gist
router.post('/', async (req, res) => {
  const gist = new Gist(req.body);

  try {
    const saved = await gist.save();
    res.send(saved);
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Get a gist
router.get('/:id', async (req, res) => {
  // const student = await Student.findById(req.params.id);

  // // Return Error if no student was found...
  // if (!student) return res.send({ error: 'Student was not found' });

  // res.send(student);
  res.send({ gists: 'hey gists id' });
});

// Update gist
router.put('/:id', async (req, res) => {
  // const student = await Student.findById(req.params.id);

  // if (!student) return res.send({ error: 'No student was found.' });

  // // Get the data from the request body
  // const { name, username, email, institution, password, bio } = req.body;

  // // Update the student details
  // if (name) student.name = name;
  // if (username) student.username = username;
  // if (email) student.email = email;
  // if (password) student.password = password;
  // if (bio) student.bio = bio;
  // if (institution) student.institution = institution;

  // try {
  //   const saved = await student.save();
  //   res.send(saved);
  // } catch (error) {
  //   res.status(400).send({ error });
  // }
  res.send({ gists: 'hey gists update' });
});

// Delete gist
router.delete('/:id', async (req, res) => {
  // try {
  //   await Student.deleteOne({ _id: req.params.id });
  //   res.send({ message: 'Student has been deleted...' });
  // } catch (error) {
  //   res.status(400).send({ error });
  // }
  res.send({ gists: 'hey gists delete' });
});

export default router;
