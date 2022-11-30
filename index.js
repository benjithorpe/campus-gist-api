import express from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import studentRoutes from './routes/students.js';
import gistRoutes from './routes/gists.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';

// Basic configuration
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer);

// Connect to DB
connect(process.env.DATABASE_URL, () => console.log('Connected...'));

// Middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));

// Routes Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/gists', gistRoutes);
app.use('/api/comments', commentRoutes);

// Normal/Documentation Routes
app.get('/', (req, res) => res.json({ message: 'hello world!' }));

httpServer.listen(PORT, () => console.log(`Running on port:${PORT}`));
