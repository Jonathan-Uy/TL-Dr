import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

// Routers
import AuthRouter from "./routes/auth";
import FileRouter from "./routes/file";
import PatientRouter from "./routes/patient";
import UserRouter from "./routes/user";

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/auth", AuthRouter);
app.use("/file", FileRouter);
app.use("/patient", PatientRouter);
app.use("/user", UserRouter);

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      app.listen(5000, () => {
        console.log("Server started on port 5000");
      });
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  console.log("MONGODB_URI not found in .env");
}
