import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import MentalHealthLog from '../models/MentalHealthLog.js';

const router = express.Router();

// GET /api/mental-logs — all mental health logs for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const logs = await MentalHealthLog.find({ user: req.user.userId }).sort({ date: -1 });
    res.json(logs.map(normalize));
  } catch (error) {
    console.error('Get mental logs error', error);
    res.status(500).json({ message: 'Server error while fetching mental logs' });
  }
});

// POST /api/mental-logs — upsert today's entry (one per user per day)
router.post('/', authMiddleware, async (req, res) => {
  const { date, mood, stress, energy, notes } = req.body;

  if (!date || !mood || !stress || !energy) {
    return res.status(400).json({ message: 'date, mood, stress, and energy are required' });
  }

  try {
    const log = await MentalHealthLog.findOneAndUpdate(
      { user: req.user.userId, date },
      { mood, stress, energy, notes: notes || '' },
      { upsert: true, new: true, runValidators: true }
    );
    res.json(normalize(log));
  } catch (error) {
    console.error('Save mental log error', error);
    res.status(500).json({ message: 'Server error while saving mental log' });
  }
});

function normalize(doc) {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  return obj;
}

export default router;
