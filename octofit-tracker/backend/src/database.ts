import mongoose from 'mongoose';

const defaultMongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || defaultMongoUri;

  await mongoose.connect(mongoUri);
  return mongoose.connection;
};

export const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
};
