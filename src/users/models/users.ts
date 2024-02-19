import { Schema, model } from "mongoose";
import { UserInterface } from "../types";

const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, "Fullname not provided"],
  },
  email: {
    type: String,
    required: [true, "Email not provided"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (v: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Not a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password not provided"],
  },
  preferences: {
    type: [String],
    default: [],
  },
});

const User = model<UserInterface>("User", userSchema);
export default User;
