import { Router } from 'express';
import bcrypt from 'bcryptjs';
// const jwt = require('jsonwebtoken');
import Student from '../models/Student.js';
import { registerValidation, loginValidation } from '../utils/validate.js';

const router = Router();

router.post('/register', async (req, res) => {
  // Validate student registration details
  const { error } = registerValidation.validate(req.body);
  if (error) return res.json({ error: error.details[0].message });

  // Check if email already exists
  const emailExists = await Student.findOne({ email: req.body.email });
  if (emailExists) return res.json({ error: 'Email already exists!' });

  // Check if username already exists
  const usernameExists = await Student.findOne({ username: req.body.username });
  if (usernameExists) return res.send({ error: 'Username already exists!' });

  // Generate salt and Hash the plain password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create the new student
  const student = new Student({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    institution: req.body.institution,
    password: hashedPassword,
  });

  // Add the student to the database
  try {
    const newStudent = await student.save();
    res.send(newStudent);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  console.log('body:', req.body);

  // Validate Student login details
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if student has an account
  const student = await Student.findOne({ email: req.body.email });
  if (!student)
    return res.json({ message: 'Invalid email or password Password!!' });

  // Check if student password is correct
  const validPassword = await bcrypt.compare(
    req.body.password,
    student.password,
  );

  if (!validPassword)
    return res.json({ message: 'Invalid email and password Password!' });

  res.status(200).send(student);

  // Create and assign new JWT to the user
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  // res.header('auth-token', token).send(token);
});

export default router;
