const router = require('express').Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const Student = require('../models/Student.js');
// const {
//   userLoginSchema,
//   userRegisterSchema,
// } = require('../utils/validation.js');

router.post('/register', async (req, res) => {
  // Create the new student
  const student = new Student(req.body);

  // Add the student to the database
  try {
    const newStudent = await student.save();
    res.json({ student: newStudent });
  } catch (error) {
    res.status(400).json({ message: error });
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

module.exports = router;
