import express from "express";
import mongoose from "mongoose";

// Routers

import "dotenv/config";

const app = express();

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
