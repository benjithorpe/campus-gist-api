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

router.put('/:id', (req, res) => {
  res.send(req.body);
});

router.delete('/:id', async (req, res) => {
  const deleted = Student.findByIdAndDelete(req.params.id);
  res.send(deleted);
});

export default router;
