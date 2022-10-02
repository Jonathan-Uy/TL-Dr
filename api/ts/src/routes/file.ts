import { Router } from "express";
import { tokenAuthenticator } from "../middleware";

const FileRouter = Router();

FileRouter.use(tokenAuthenticator);

FileRouter.get("/", (req, res) => {
  res.send(req.user);
});

export default FileRouter;
