export type User = {
  _id: string;
  name: string;
  email: string;
  hash: string;
  files: [File];
  patients: [Patient];
};

export type File = {
  _id: string;
  name: string;
  created: Date;
  owner: string;
  viewers: [string];
  path: string;
  type: string;
};

export type Patient = {
  _id: string;
  name: string;
  email: string;
  doctors: [string];
};
