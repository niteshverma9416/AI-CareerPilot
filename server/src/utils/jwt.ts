import jwt from "jsonwebtoken";
import { env } from "@/config/env";

export interface IJwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate a JWT token containing the user details.
 */
export function generateToken(payload: IJwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

/**
 * Verify a JWT token and decode its payload.
 */
export function verifyToken(token: string): IJwtPayload {
  try {
    return jwt.verify(token, env.JWT_SECRET) as IJwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
