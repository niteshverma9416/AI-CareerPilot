import { HTTP_STATUS, type HttpStatus } from "@/constants/httpStatus";

export class ApiError extends Error {
  readonly statusCode: HttpStatus;
  readonly isOperational: boolean;
  readonly details?: unknown;

  constructor(statusCode: HttpStatus, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, details?: unknown) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, details);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message);
  }

  static notFound(message: string) {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message);
  }

  static internal(message = "Internal server error") {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }
}
