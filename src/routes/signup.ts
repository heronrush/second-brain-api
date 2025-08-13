import { Router } from "express";
import { validateSignupData } from "../middleware/auth";
import { createNewUser } from "../middleware/db";

export const signupRouter = Router();

signupRouter.post(
  "/api/v1/signup",
  validateSignupData,
  createNewUser,
  (req, res) => {
    res.json({ msg: "signup successful" });
  }
);
