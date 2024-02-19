import mongoose from "mongoose";
import { UserInterface, UserRoles } from "../types";

const Schema = mongoose.Schema;

const userSchema = new Schema<UserInterface>({
  fullName: {
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
  role: {
    type: Number,
    required: [true, "Role not provided"],
    enum: UserRoles,
  },
  password: {
    type: String,
    required: [true, "Password not provided"],
  },
});

module.exports = mongoose.model("User", userSchema);
