import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "@/utils/jwt";
import { authRepository } from "@/repositories/auth.repository";
import { ApiError } from "@/utils/ApiError";

export async function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next(ApiError.unauthorized("Authentication required. No token provided."));
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      next(ApiError.unauthorized("Authentication required. Invalid token format."));
      return;
    }

    const decoded = verifyToken(token);
    const user = await authRepository.findById(decoded.userId);

    if (!user) {
      next(ApiError.unauthorized("Authentication required. User not found."));
      return;
    }

    // Attach authenticated user to req.user (typed as IUserDocument)
    req.user = user;

    next();
  } catch (error) {
    next(ApiError.unauthorized("Authentication required. Invalid or expired token."));
  }
}
