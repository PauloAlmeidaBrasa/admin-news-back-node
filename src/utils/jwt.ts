import jwt from "jsonwebtoken";
import { JwtUserPayload } from "@contracts/jwt";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signJwt(payload: JwtUserPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET) as string;
}
