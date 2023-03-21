import env from 'env';
import mongoose from 'mongoose';
import { MongoStore } from 'wwebjs-mongo';

export const connection = async (uri: string) => {
  console.log('Creating new mongo connection...');
  try {
    if (!uri) {
      throw new Error('No uri for mongoDB connection provided');
    }
    mongoose.set('strictQuery', true); // suppress mongo API warning
    return mongoose.connect(uri);
  } catch (e) {
    console.error('Mongo connection error: ', e);
  }
};

export const getMongoStore = async () => {
  try {
    if (!env.WA_SESSION_REMOTE_MONGODB_URI) {
      throw new Error('No value for WA_SESSION_REMOTE_MONGODB_URI in process.env found');
    }
    await connection(env.WA_SESSION_REMOTE_MONGODB_URI);
    console.log('Mongo connection established!');
    return new MongoStore({ mongoose: mongoose });
  } catch (e) {
    console.error('Create mongo store error: ', e);
  }
};

export default getMongoStore;
