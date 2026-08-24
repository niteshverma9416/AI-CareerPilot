import type { Request, Response } from "express";
import { HTTP_STATUS } from "@/constants";
import { asyncHandler } from "@/middleware/asyncHandler";
import { getHealthStatus } from "@/services/health.service";

export const getHealth = asyncHandler((_req: Request, res: Response) => {
  const payload = getHealthStatus();
  res.status(HTTP_STATUS.OK).json(payload);
});
