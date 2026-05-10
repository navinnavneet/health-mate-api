import mongoose from 'mongoose';

const generalogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    age: { type: Number, required: true },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    activityLevel: {
      type: String,
      required: true,
      enum: ['sedentary', 'light', 'moderate', 'active', 'extreme'],
    },
    goal: {
      type: String,
      required: true,
      enum: ['lose', 'gain', 'maintain'],
    },
  },
  { timestamps: true }
);

const Generalog = mongoose.model('Generalog', generalogSchema);
export default Generalog;
