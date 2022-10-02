import { Router } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import { tokenAuthenticator } from "../middleware";
import File from "../models/file";

const FileRouter = Router();

FileRouter.use(tokenAuthenticator);

FileRouter.post("/upload", async (req, res) => {
  if (!req.files)
    return res.status(400).send({ error: "No files were uploaded." });

  console.log(req);

  const file = req.files.document as fileUpload.UploadedFile;

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

  await uploadedFile.save();

  res.send("File successfully uploaded.");
});

FileRouter.get("/", (req, res) => {
  res.send(req.user);
});

export default FileRouter;
