import { hash, compare } from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export function verifyJwt(token: string) {
  try {
    const tokenSecret = process.env.TOKEN_SECRET;
    const decoded = jwt.verify(token, tokenSecret!);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
