import jwt from "jsonwebtoken";

export function signJWT(payload: Object): string {
  return jwt.sign(payload, process.env.JWT_SECRET!);
}

export function verifyJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
