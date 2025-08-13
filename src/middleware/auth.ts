import { NextFunction, Request, Response } from "express";
import z from "zod";

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
    next();
  } else {
    res.status(411).json({ msg: "not valid data provided in signin" });
  }
}
