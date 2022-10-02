import axios from "axios";
import { Router } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import { tokenAuthenticator } from "../middleware";
import File from "../models/file";
import User from "../models/user";
import { createHandoffReportText } from "../services/openai";

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
    type: "Original document",
    data: file.data.toString("base64"),
  });

  let user = await User.findById(req.user!._id);

  user!.files.push(id);

  await user!.save();

  console.log("hi");

  await uploadedFile.save();

  res.send({ ...uploadedFile, owner: req.user!.name });
});

FileRouter.get("/", async (req, res) => {
  const files = await File.find({ owner: req.user!._id }).populate("owner");
  res.send(files);
});

FileRouter.post("/generate-report", async (req, res) => {
  const { fileId } = req.body;
  const file = await File.findById(fileId);

  if (!file) return res.status(404).send({ error: "File not found." });

  const cleanTextResponse = await axios.post(
    `${process.env.PYTHON_API_URL}/clean-pdf`,
    { pdf: file.data }
  );

  const [reportData, reportTitle] = await createHandoffReportText(
    cleanTextResponse.data,
    req.user!.name
  );

  console.log("report", reportData);

  const reportResponse = await axios.post(
    `${process.env.PYTHON_API_URL}/generate-report`,
    { reportData: JSON.stringify(reportData) }
  );

  const id = new mongoose.Types.ObjectId();

  const newReport = new File({
    _id: id,
    name: reportTitle,
    created: new Date(),
    owner: req.user!._id,
    viewers: [],
    type: "Handoff report",
    data: reportResponse.data,
  });

  await newReport.save();

  res.status(200).send(newReport);
});

FileRouter.post("/download", async (req, res) => {
  const { fileId } = req.body;

  const file = await File.findById(fileId);

  const download = Buffer.from(file!.data, "base64");

  res.type("application/pdf");
  res.header("Content-Disposition", `attachment; filename="${file!.name}.pdf"`);
  res.send(download);
  // res.writeHead(200, {
  //   "Content-Type": "application/pdf",
  //   "Content-Disposition": `attachment; filename="${file!.name}"`,
  // });

  // res.end(download);
});

FileRouter.post("/delete", async (req, res) => {
  const { fileId } = req.body;
  await File.deleteOne({ _id: fileId });
  res.sendStatus(204);
});

export default FileRouter;
