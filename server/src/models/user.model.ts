import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput {
  email: string;
  password: string;
  userAgent: string;
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  matchPasswords: (password: UserInput["password"]) => boolean;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true},
    password: { type: String, required: true},
    userAgent: { type: String, required: true}
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
    const user = this;
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  });

userSchema.methods.matchPasswords = async function (password: UserInput["password"]) {
  const user = this;
  return await bcrypt.compare(password, user.password);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
