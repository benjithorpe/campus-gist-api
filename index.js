import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from 'mongoose';

import studentRoutes from './routes/students.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connect(process.env.DATABASE_URL, () => console.log('Connected...'));

// Middlewares
app.use(json());
app.use(cors({ origin: '*' }));

// Routes Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Normal/Documentation Routes
app.get('/', (req, res) => res.json({ message: 'hello world!' }));

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
