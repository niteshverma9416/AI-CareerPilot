import type { NextFunction, Request, Response } from "express";
import { env } from "@/config/env";
import { HTTP_STATUS, MESSAGES } from "@/constants";
import { ApiError } from "@/utils/ApiError";
import { logger } from "@/utils/logger";

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(ApiError.notFound(`${MESSAGES.NOT_FOUND}: ${req.originalUrl}`));
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode =
    err instanceof ApiError
      ? err.statusCode
      : HTTP_STATUS.INTERNAL_SERVER_ERROR;

  const message =
    err instanceof ApiError ? err.message : MESSAGES.INTERNAL_ERROR;

  const details = err instanceof ApiError ? err.details : undefined;

  logger.error(err.message, {
    statusCode,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(details !== undefined ? { details } : {}),
    ...(env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
