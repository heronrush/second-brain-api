import { NextFunction, Request, Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// signup schema
const signupSchema = z.object({
  email: z.string(),
  password: z.string(),
});

// signin schema
const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});

// validates signup data
export function validateSignupData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const validData = signupSchema.safeParse({ email, password });

  if (validData.success) {
    next();
  } else {
    res.status(411).json({ msg: "not valid data provided in signup" });
  }
}

// validates signin data
export function validateSigninData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const validData = signinSchema.safeParse({ email, password });

  if (validData.success) {
    const token = generateToken(email);
    res.json({ msg: "signin success", token });
  } else {
    res.status(411).json({ msg: "not valid data provided in signin" });
  }
}

// generate jwt token
export function generateToken(email: string) {
  const jwt_secret = process.env.JWT_SECRET as string;

  const token = jwt.sign({ email }, jwt_secret);

  return token;
}
