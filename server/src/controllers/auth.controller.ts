import type { NextFunction, Request, Response } from "express";
import { authService } from "@/services/auth.service";
import { HTTP_STATUS } from "@/constants/httpStatus";

export class AuthController {
  /**
   * POST /api/v1/auth/register
   */
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token, user } = await authService.register(req.body);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "User registered successfully",
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/v1/auth/login
   */
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.login(email, password);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/v1/auth/me
   */
  getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // req.user has already been populated by authenticate middleware
      res.status(HTTP_STATUS.OK).json({
        success: true,
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/v1/auth/logout
   */
  logout = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
