import { Router } from 'express';

import Student from '../models/Student.js';

const router = Router();

router.get('/', async (req, res) => {
  const students = await Student.find();

  if (!students) return res.send({ error: 'No students found' });

  res.send(students);
});

router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);

  // Return Error if no student was found...
  if (!student) return res.send({ error: 'Student was not found' });

  res.send(student);
});

router.put('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) return res.send({ error: 'No student was found.' });

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
    const saved = await student.save();
    res.send(saved);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.delete('/:id', async (req, res) => {
  const deleted = Student.findByIdAndDelete(req.params.id);
  res.send(deleted);
});

export default router;
