import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// generate jwt token
export function generateToken(email: string) {
  const jwt_secret = process.env.JWT_SECRET as string;

  const token = jwt.sign({ email }, jwt_secret);

  return token;
}
