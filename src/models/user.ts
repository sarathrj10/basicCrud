import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import settings from "../config";
import { Document, Schema,Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isValidPassword: (password: string, hashPassword: string) => Promise<boolean>;
  generateAuthToken: (this: IUser) => string;
}

interface IUserModel extends Model<IUser>{
    generateHash: (password: string) => Promise<string>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.generateHash = async function (
  password: string
): Promise<string> {
  return bcrypt.hash(password, await bcrypt.genSalt(10));
};

UserSchema.methods.isValidPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => bcrypt.compare(password, hashPassword);

UserSchema.methods.generateAuthToken = function (this: IUser): string {
  return jwt.sign({ id: this._id }, settings.jwt.secretKey, {
    expiresIn: 60 * 30,
  });
};

export default mongoose.model<IUser,IUserModel>("UserModel", UserSchema);
