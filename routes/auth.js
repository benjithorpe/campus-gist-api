const router = require('express').Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const Student = require('../models/Student.js');
// const {
//   userLoginSchema,
//   userRegisterSchema,
// } = require('../utils/validation.js');

router.post('/register', async (req, res) => {
  // Validate User data
  // const { error } = userRegisterSchema.validate(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  console.log(req.body);
  // Check if user(email) already exists
  // const emailExists = await Student.findOne({ email: req.body.email });
  // if (emailExists) {
  //   return res.status(400).json({ message: 'Email already exists!' });
  // }

  // Hash the user password
  // const passwordSalt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, passwordSalt);

  // Create the new user
  // const user = new Student({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: hashedPassword,
  // });

  // Add the user to the database
  // try {
  //   const newUser = await user.save();
  //   res.json({ user: newUser._id });
  // } catch (error) {
  //   res.status(404).json({ message: error });
  // }
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
