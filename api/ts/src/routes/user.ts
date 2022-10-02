import { Router } from "express";
import { tokenAuthenticator } from "../middleware";

const UserRouter = Router();

UserRouter.use(tokenAuthenticator);

UserRouter.get("/", (req, res) => {
  res.send(req.user);
});

export default UserRouter;
