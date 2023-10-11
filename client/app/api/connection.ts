import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI as string );
  }
};

export default connectDb;
