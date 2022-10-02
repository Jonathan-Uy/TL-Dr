import { userType } from "../../src/types";

declare module "express-serve-static-core" {
  interface Request {
    user?: userType;
  }
}
