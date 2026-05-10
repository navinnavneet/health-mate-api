import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Generalog from '../models/Generalog.js';

const router = express.Router();

// GET /api/profile — fetch the authenticated user's health profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await Generalog.findOne({ user: req.user.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Get profile error', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

// POST /api/profile — create or update the authenticated user's health profile
router.post('/', authMiddleware, async (req, res) => {
  const { age, gender, height, weight, activityLevel, goal } = req.body;

  if (!age || !gender || !height || !weight || !activityLevel || !goal) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const profile = await Generalog.findOneAndUpdate(
      { user: req.user.userId },
      { age, gender, height, weight, activityLevel, goal },
      { upsert: true, new: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) {
    console.error('Save profile error', error);
    res.status(500).json({ message: 'Server error while saving profile' });
  }
});

export default router;
