import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import { generateToken } from "../utils/jwt";
import { checkPassword, hashPassword } from "../utils/hashPassword";

const prisma = new PrismaClient();

// creates and saves new user to the db
export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  if (newUser) {
    const token = generateToken(email);
    res.json({ msg: "signup success", token, userId: newUser.id });
  } else {
    res.json({ msg: "error while saving a new user to db" });
  }
}

// checks if user already in the db for signup
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
    res.status(403).json({
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
    },
  });

  if (userExists) {
    const passwordIsCorrect = await checkPassword(
      password,
      userExists.password
    );

    if (passwordIsCorrect) {
      const token = generateToken(email);
      res.json({ msg: "signin success", token, userId: userExists.id });
    } else {
      res.status(403).json({ msg: "password is incorrect while signing in" });
    }
  } else {
    res.status(403).json({
      msg: "no user exists with the provided email while signing in",
    });
  }
}
