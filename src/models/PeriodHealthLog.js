import mongoose from 'mongoose';

const periodHealthLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    endDate: {
      type: String, // YYYY-MM-DD
      default: null,
    },
    flow: {
      type: String,
      required: true,
      enum: ['light', 'medium', 'heavy'],
    },
    symptoms: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

periodHealthLogSchema.index({ user: 1, startDate: -1 });

const PeriodHealthLog = mongoose.model('PeriodHealthLog', periodHealthLogSchema);
export default PeriodHealthLog;
