import { Router } from "express";
import { tokenAuthenticator } from "../middleware";
import Patient from "../models/patient";

const PatientRouter = Router();

PatientRouter.use(tokenAuthenticator);

PatientRouter.get("/", (req, res) => {
  res.send(Patient.find({ doctors: req.user!._id }));
});

export default PatientRouter;
