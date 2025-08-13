import { Router } from "express";
import { generateToken, validateSigninData } from "../middleware/auth";

export const signinRouter = Router();

signinRouter.post("/api/v1/signin", validateSigninData, (req, res) => {
  res.json({ msg: "signin router" });
});
