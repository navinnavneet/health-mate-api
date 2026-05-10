import mongoose from 'mongoose';

const mentalHealthLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    mood: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    stress: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    energy: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// One entry per user per day
mentalHealthLogSchema.index({ user: 1, date: 1 }, { unique: true });

const MentalHealthLog = mongoose.model('MentalHealthLog', mentalHealthLogSchema);
export default MentalHealthLog;
