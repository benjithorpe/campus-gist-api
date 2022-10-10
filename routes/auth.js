import { Router } from 'express';
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

import Student from '../models/Student.js';
import { registerStudentValidation } from '../utils/validate.js';

const router = Router();

router.post('/register', async (req, res) => {
  // Validate student registration details
  const { error } = registerStudentValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if email already exists
  const emailExists = await Student.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ message: 'Email already exists!' });

  // Check if username already exists
  const usernameExists = await Student.findOne({ username: req.body.username });
  if (usernameExists)
    return res.status(400).json({ message: 'Username already exists!' });

  // Create the new student
  const student = new Student({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    institution: req.body.institution,
    password: req.body.password,
  });

  // Add the student to the database
  try {
    const newStudent = await student.save();
    res.send({ student: newStudent });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// router.post('/login', async (req, res) => {
//   // Validate Student data
//   const { error } = userLoginSchema.validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   // Check if user has an account
//   const user = await Student.findOne({ email: req.body.email });
//   if (!user) return res.json({ message: 'Email does not exists!' });

//   // Compare the password
//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) return res.json({ message: 'Password is not correct!' });

//   // Create and assign new JWT to the user
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
//   res.header('auth-token', token).send(token);
// });

export default router;
