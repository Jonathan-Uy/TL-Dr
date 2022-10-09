import axios from "axios";
import { Router } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import { tokenAuthenticator } from "../middleware";
import File from "../models/file";
import User from "../models/user";
import { transporter } from "../services/mailer";
import {
  createHandoffReportText,
  createPatientReportText,
} from "../services/openai";
import stream from "stream";
import fs from "fs";

const FileRouter = Router();

FileRouter.use(tokenAuthenticator);

FileRouter.post("/upload", async (req, res) => {
  // console.log(req);

  if (!req.files)
    return res.status(400).send({ error: "No files were uploaded." });

  // console.log(req);

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

  // console.log("hi");

  await uploadedFile.save();

  res.send({ ...uploadedFile, owner: req.user!.name });
});

FileRouter.get("/", async (req, res) => {
  const files = await File.find({ owner: req.user!._id }).populate("owner");
  res.send(files);
});

FileRouter.post("/generate-handoff", async (req, res) => {
  const { fileId } = req.body;
  const file = await File.findById(fileId);

  if (!file) return res.status(404).send({ error: "File not found." });

  const cleanTextResponse = await axios.post(
    `${process.env.PYTHON_API_URL}/clean-pdf`,
    { pdf: file.data }
  );

  console.log("CLEAN TEXT RESPONSE", cleanTextResponse.data);

  const [reportData, reportTitle] = await createHandoffReportText(
    cleanTextResponse.data,
    req.user!.name
  );

  // console.log("report", reportData);

  const reportResponse = await axios.post(
    `${process.env.PYTHON_API_URL}/generate-handoff`,
    { report_data: JSON.stringify(reportData) }
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

FileRouter.post("/generate-summary", async (req, res) => {
  const { fileId, language } = req.body;
  const file = await File.findById(fileId);

  if (!file) return res.status(404).send({ error: "File not found." });

  const cleanTextResponse = await axios.post(
    `${process.env.PYTHON_API_URL}/clean-pdf`,
    { pdf: file.data }
  );

  if (language) {
    const [reportData, reportTitle] = await createPatientReportText(
      cleanTextResponse.data,
      req.user!.name,
      language
    );

    console.log("report", reportData);

    const reportResponse = await axios.post(
      `${process.env.PYTHON_API_URL}/generate-summary`,
      { report_data: JSON.stringify(reportData) }
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
  } else {
    const [reportData, reportTitle] = await createPatientReportText(
      cleanTextResponse.data,
      req.user!.name
    );

    console.log("report", reportData);

    const reportResponse = await axios.post(
      `${process.env.PYTHON_API_URL}/generate-summary`,
      { report_data: JSON.stringify(reportData) }
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
  }
});

FileRouter.post("/download", async (req, res) => {
  const { fileId } = req.body;

  const file = await File.findById(fileId);

  const fileContents = Buffer.from(file!.data, "base64");
  const filename = `${new Date().valueOf()}.pdf`;
  fs.writeFileSync(`./files/${filename}`, file!.data, "base64");

  const data = fs.readFileSync(`./files/${filename}`);

  res.contentType("application/pdf");
  res.send(data);

  // const download = Buffer.from(file!.data, "base64");
  // res.download(`${file!.data}`);
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

FileRouter.post("/email", async (req, res) => {
  const { fileId, email } = req.body;

  const file = await File.findById(fileId);

  const mailData = {
    from: "alexjy@yahoo.com",
    to: email,
    subject: "Patient Information Document Email",
    attachments: [
      {
        path: `data:application/pdf;base64,${file!.data}`,
      },
    ],
  };

  transporter.sendMail(mailData, (error: any, response: any) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.status(204).send(response);
    }
  });
});

export default FileRouter;
