import { Router } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import { tokenAuthenticator } from "../middleware";
import File from "../models/file";
import User from "../models/user";

const FileRouter = Router();

FileRouter.use(tokenAuthenticator);

FileRouter.post("/upload", async (req, res) => {
  console.log(req);

  if (!req.files)
    return res.status(400).send({ error: "No files were uploaded." });

  console.log(req);

  const file = req.files.files as fileUpload.UploadedFile;

  const id = new mongoose.Types.ObjectId();

  const uploadedFile = new File({
    _id: id,
    name: file.name,
    created: new Date(),
    owner: req.user!._id,
    viewers: [],
    type: file.mimetype,
    size: file.size,
    data: file.data.toString("base64"),
  });

  let user = await User.findById(req.user!._id);

  console.log(user);

  user!.files.push(id);

  await user!.save();

  console.log("hi");

  await uploadedFile.save();

  res.send(uploadedFile);
});

FileRouter.get("/", async (req, res) => {
  const files = await File.find({ owner: req.user!._id });
  res.send(files);
});

export default FileRouter;
