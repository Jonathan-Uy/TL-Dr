export type User = {
  _id: string;
  token: string;
  name: string;
  email: string;
  hash: string;
  files: [FileType];
  patients: [Patient];
};

export type FileType = {
  _id: string;
  name: string;
  created: Date;
  owner: User;
  viewers: [string];
  type: string;
  data: string;
};

export type Patient = {
  _id: string;
  name: string;
  email: string;
  doctors: [string];
};
