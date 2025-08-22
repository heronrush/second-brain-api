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
    res.status(411).json({ msg: "Error in signup inputs" });
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
    next();
  } else {
    res.status(411).json({ msg: "not valid data provided in signin" });
  }
}

// verifies jwt on every route
export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  const jwt_secret = process.env.JWT_SECRET as string;

  if (token) {
    const verified = jwt.verify(token, jwt_secret, (err, decodedPayload) => {
      if (err) {
        res.json({ msg: "wrong jwt provided" });
      } else {
        next();
      }
    });
  } else {
    res.json({ msg: "no valid token provided" });
  }
}
