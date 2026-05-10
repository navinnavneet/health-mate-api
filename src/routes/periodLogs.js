import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import PeriodHealthLog from '../models/PeriodHealthLog.js';

const router = express.Router();

// GET /api/period-logs — all period cycles for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const logs = await PeriodHealthLog.find({ user: req.user.userId }).sort({ startDate: -1 });
    res.json(logs.map(normalize));
  } catch (error) {
    console.error('Get period logs error', error);
    res.status(500).json({ message: 'Server error while fetching period logs' });
  }
});

// POST /api/period-logs — create a new period cycle
router.post('/', authMiddleware, async (req, res) => {
  const { startDate, endDate, flow, symptoms, notes } = req.body;

  if (!startDate || !flow) {
    return res.status(400).json({ message: 'startDate and flow are required' });
  }

  try {
    const log = await PeriodHealthLog.create({
      user: req.user.userId,
      startDate,
      endDate: endDate || null,
      flow,
      symptoms: symptoms || [],
      notes: notes || '',
    });
    res.status(201).json(normalize(log));
  } catch (error) {
    console.error('Create period log error', error);
    res.status(500).json({ message: 'Server error while creating period log' });
  }
});

// PUT /api/period-logs/:id — update an existing period cycle
router.put('/:id', authMiddleware, async (req, res) => {
  const { startDate, endDate, flow, symptoms, notes } = req.body;

  try {
    const log = await PeriodHealthLog.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { startDate, endDate: endDate || null, flow, symptoms: symptoms || [], notes: notes || '' },
      { new: true, runValidators: true }
    );

    if (!log) {
      return res.status(404).json({ message: 'Period log not found' });
    }

    res.json(normalize(log));
  } catch (error) {
    console.error('Update period log error', error);
    res.status(500).json({ message: 'Server error while updating period log' });
  }
});

function normalize(doc) {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  return obj;
}

export default router;
