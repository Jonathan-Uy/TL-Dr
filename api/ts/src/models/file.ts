import mongoose from "mongoose";
import { fileType } from "../types";

const fileSchema = new mongoose.Schema<fileType>({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  type: String,
  size: Number,
  data: String,
});

const File = mongoose.model<fileType>("File", fileSchema);

export default File;
