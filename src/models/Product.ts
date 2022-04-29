import mongoose from 'mongoose';
import { IProduct } from '../types/product';

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: String,
    price: {
      type: Number,
      required: true,
    },
    description: String,
    image: String,
    code: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);

