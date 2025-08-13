import { Router } from "express";
import { validateSigninData } from "../middleware/auth";
import { generateToken } from "../utils/tokenGenerator";
import { checkSigninUserExists } from "../middleware/db";

export const signinRouter = Router();

signinRouter.post(
  "/api/v1/signin",
  validateSigninData,
  checkSigninUserExists,
  (req, res) => {
    res.json({ msg: "signin success" });
  }
);
