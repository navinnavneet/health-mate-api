import mongoose from 'mongoose';

const connectDB = async (uri) => {
  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to MongoDB');
};

export default connectDB;
