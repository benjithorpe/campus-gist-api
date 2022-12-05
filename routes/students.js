import { Router } from 'express';

import auth from '../middlewares/auth.js';
import Student from '../models/Student.js';

const router = Router();

// Get all students
router.get('/', async (req, res) => {
  // Get all students without displaying their passwords
  const students = await Student.find().select('-password -__v');
  if (!students) return res.status(400).send({ error: 'No students found' });

  res.send(students);
});

// Get profile details of a student
router.get('/profile', auth, async (req, res) => {
  const student = await Student.findById(req.user._id).select('-password');

  res.send(student);
});

// Get a specific student
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id).select('-password');

  // Return Error if no student was found...
  if (!student) return res.status(400).send({ error: 'Student was not found' });

  res.send(student);
});

// Update Student details
router.put('/:id', auth, async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) return res.status(400).send({ error: 'No student was found.' });

  // Get the data from the request body
  const { name, username, email, institution, password, bio } = req.body;

  // Update the student details
  if (name) student.name = name;
  if (username) student.username = username;
  if (email) student.email = email;
  if (password) student.password = password;
  if (bio) student.bio = bio;
  if (institution) student.institution = institution;

  try {
    // Save the new details for the student
    const saved = await student.save();
    res.send(saved);
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Delete a student
router.delete('/:id', auth, async (req, res) => {
  try {
    await Student.deleteOne({ _id: req.params.id });
    res.send({ message: 'Student has been deleted...' });
  } catch (error) {
    res.status(400).send({ error });
  }
});

export default router;
