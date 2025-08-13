import bcrypt from "bcrypt";

export async function hashPassword(plainString: string) {
  const hashedPassword = await bcrypt.hash(plainString, 10);

  return hashedPassword;
}

export async function checkPassword(
  plainString: string,
  hashedPassword: string
) {
  const passwordCorrect = await bcrypt.compare(plainString, hashedPassword);

  return passwordCorrect;
}
