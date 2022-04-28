import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://Matias:coderhouse@cluster0.asa9o.mongodb.net/Productos");
  } catch (error) {
    console.error(error);
  }
};
