import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBook>("BookModel", BookSchema);
