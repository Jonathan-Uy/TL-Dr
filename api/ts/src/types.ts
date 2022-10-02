import { Types } from "mongoose";

export type userType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  hash: string;
  files: [Types.ObjectId];
  patients: [Types.ObjectId];
};

export type fileType = {
  _id: Types.ObjectId;
  name: string;
  created: Date;
  owner: Types.ObjectId;
  viewers: [Types.ObjectId];
  type: string;
  size: number;
  data: string;
};

export type patientType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  doctors: [Types.ObjectId];
};
