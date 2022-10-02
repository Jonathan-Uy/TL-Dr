import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { signJWT } from "../utils";

const AuthRouter = Router();

AuthRouter.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
  }: { name: string | null; email: string | null; password: string | null } =
    req.body;

  if (!name || !email || !password)
    return res.status(400).send({ error: "Missing fields" });

  const checkUser = await User.findOne({ email });

  if (checkUser) return res.status(400).send({ error: "Email already exists" });

  const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const user = new User({
    name,
    email,
    hash,
  });

  await user.save();

  res.send("User successfully registered.");
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password }: { email: string | null; password: string | null } =
    req.body;

  if (!email || !password)
    return res.status(400).send({ error: "Missing fields" });

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.hash);

  if (!isMatch) return res.status(400).send({ error: "Incorrect password" });

  console.log(user);

  res.status(200).send({
    name: user.name,
    email: user.email,
    token: signJWT({
      userid: user._id,
    }),
  });
});

export default AuthRouter;
