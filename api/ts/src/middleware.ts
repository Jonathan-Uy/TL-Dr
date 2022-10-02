import express from "express";
import User from "./models/user";
import { verifyJWT } from "./utils";

export const tokenAuthenticator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"] as string;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send({ error: "Unauthorized" });

  const decodedToken = verifyJWT(token) as { userid: string };

  const user = await User.findById(decodedToken.userid);

  if (!user) return res.status(400).send({ error: "User not found" });

  req.user = user;

  next();
};
