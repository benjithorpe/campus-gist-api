import { Router } from 'express';
import bcrypt from 'bcryptjs';

import Student from '../models/Student.js';
import { registerValidation, loginValidation } from '../utils/validate.js';
import { generateAuthToken } from '../utils/auth.js';
import gravatar from '../utils/gravatar.js';

const router = Router();

router.post('/register', async (req, res) => {
  // Validate student registration details
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if email already exists
  const emailExists = await Student.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ message: 'Email already exists!' });

  // Check if username already exists
  const usernameExists = await Student.findOne({ username: req.body.username });
  if (usernameExists)
    return res.status(400).json({ message: 'Username already exists!' });

  // Generate salt and Hash the plain password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create the new student
  const student = new Student({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    image: gravatar(req.body.email),
    institution: req.body.institution,
    password: hashedPassword,
  });

  // Add the student to the database
  try {
    const newStudent = await student.save();

    // Generate new JWT (JSON Web Token)
    const token = generateAuthToken({
      _id: newStudent._id,
      username: newStudent.username,
      isAdmin: newStudent.isAdmin,
    });

    // Set the token as request header and send some student data
    res.header('x-auth-token', token).send({
      _id: newStudent._id,
      fullname: newStudent.fullname,
      username: newStudent.username,
      email: newStudent.email,
    });
    res.send(newStudent);
  } catch (error) {
    res.send({ message: error });
  }
});

router.post('/login', async (req, res) => {
  // Validate Student login details
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if student has an account
  const student = await Student.findOne({ email: req.body.email });
  if (!student)
    return res.status(400).json({ message: 'Invalid email or password!!' });

  // Check if student password is correct
  const validPassword = await bcrypt.compare(
    req.body.password,
    student.password,
  );

  if (!validPassword)
    return res
      .status(400)
      .json({ message: 'Invalid email or password Password!' });

  // Generate new JWT (JSON Web Token)
  const token = generateAuthToken({
    _id: student._id,
    username: student.username,
    isAdmin: student.isAdmin,
  });

  // Set the token as request header and send some student data
  res.header('x-auth-token', token).send({
    _id: student._id,
    fullname: student.fullname,
    username: student.username,
    email: student.email,
    isAdmin: student.isAdmin,
  });
});

export default router;
