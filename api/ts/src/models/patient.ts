import mongoose from "mongoose";
import { patientType } from "../types";

const patientSchema = new mongoose.Schema<patientType>({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
});

const Patient = mongoose.model<patientType>("Patient", patientSchema);

export default Patient;
