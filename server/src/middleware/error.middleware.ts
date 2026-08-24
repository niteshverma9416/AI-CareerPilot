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
  let statusCode =
    err instanceof ApiError
      ? err.statusCode
      : HTTP_STATUS.INTERNAL_SERVER_ERROR;

  let message =
    err instanceof ApiError ? err.message : MESSAGES.INTERNAL_ERROR;

  let details = err instanceof ApiError ? err.details : undefined;

  // Intercept Multer validation/limit errors and format them as proper BAD_REQUEST validation errors
  if (err.name === "MulterError" || err.message.includes("Multer") || err.message.includes("Only PDF, DOC, and DOCX")) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = err.message;
  }

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
