import mongoose from 'mongoose';
import {mogodb} from '../../key'



export const connectDb = async () => {
  try {
    await mongoose.connect(mogodb.URI, {});
  } catch (error) {
    console.error(error);
  }
};
