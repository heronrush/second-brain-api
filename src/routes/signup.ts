import { Router } from "express";
import { validateSignupData } from "../middleware/auth";
import { checkSignupUserExists, createNewUser } from "../middleware/db";

export const signupRouter = Router();

signupRouter.post(
  "/api/v1/signup",
  validateSignupData,
  checkSignupUserExists,
  createNewUser,
  (req, res) => {
    res.json({ msg: "signup successful" });
  }
);
