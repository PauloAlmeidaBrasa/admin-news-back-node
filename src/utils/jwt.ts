import jwt from "jsonwebtoken";
import { JwtTokenPayload } from "@contracts/jwt";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signJwt(payload: JwtTokenPayload) {
  const user = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
  return user
}

export function verifyJwt(token: string): JwtTokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtTokenPayload;


  return {
    id: decoded.id,
    name: decoded.name,
    client_id: decoded.client_id,
    email: decoded.email
  };
}