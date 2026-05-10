import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../src/config/db.js';
import authRoutes from '../src/routes/auth.js';
import profileRoutes from '../src/routes/profile.js';
import mentalLogsRoutes from '../src/routes/mentalLogs.js';
import periodLogsRoutes from '../src/routes/periodLogs.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/mental-logs', mentalLogsRoutes);
app.use('/api/period-logs', periodLogsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'FitSense API is running' });
});

const handler = async (req, res) => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app(req, res);
  } catch (error) {
    console.error('Vercel API error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default handler;
