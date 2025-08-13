import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma";

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
