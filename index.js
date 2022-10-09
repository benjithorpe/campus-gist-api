const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const studentRoutes = require('./routes/students.js');
const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
mongoose.connect(process.env.DATABASE_URL, () => console.log('Connected...'));

// Middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));

// Routes Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Normal/Documentation Routes
app.get('/', (req, res) => res.json({ message: 'hello world!' }));

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
