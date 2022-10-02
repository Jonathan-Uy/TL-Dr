import mongoose from "mongoose";
import { userType } from "../types";

const userSchema = new mongoose.Schema<userType>({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hash: String,
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
});

const User = mongoose.model<userType>("User", userSchema);

export default User;
