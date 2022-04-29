import { promises as fs } from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { ICart } from '../types/cart';
import { IProduct } from '../types/product';

const cartSchema = new mongoose.Schema<ICart>(
  {
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
