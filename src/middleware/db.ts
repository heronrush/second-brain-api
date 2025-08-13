import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma";
import { generateToken } from "../utils/tokenGenerator";

const prisma = new PrismaClient();

// creates and saves new user to the db
export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });

  if (newUser) {
    next();
  } else {
    res.json({ msg: "error while saving a new user to db" });
  }
}

// checks if user already in the db
export async function checkSignupUserExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    res.json({
      msg: "user already exists in the db, provide different unique email",
    });
  } else {
    next();
  }
}

// checks if user already in the db for signin
export async function checkSigninUserExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  if (userExists) {
    const token = generateToken(email);
    res.json({ msg: "signin success", token });
  } else {
    res.json({ msg: "email or password is wrong" });
  }
}
