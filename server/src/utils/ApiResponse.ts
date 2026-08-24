import type { Response } from "express";
import { HTTP_STATUS, type HttpStatus } from "@/constants/httpStatus";
import type { IApiResponse } from "@/interfaces";

export function sendSuccess<T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: HttpStatus = HTTP_STATUS.OK,
): Response {
  const payload: IApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
  };

  return res.status(statusCode).json(payload);
}

export function sendError(
  res: Response,
  message: string,
  statusCode: HttpStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  details?: unknown,
): Response {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(details !== undefined ? { details } : {}),
  });
}
