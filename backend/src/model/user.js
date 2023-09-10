import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "is required field"],
    },
    email: {
      type: String,
      unique: [true, "is must be unique"],
      required: [true, "is required field"],
    },
    password: {
      type: String,
      required: [true, "is required field"],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
