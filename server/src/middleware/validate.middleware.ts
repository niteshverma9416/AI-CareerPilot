import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { MESSAGES } from "@/constants";
import { ApiError } from "@/utils/ApiError";

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      next(ApiError.badRequest(MESSAGES.VALIDATION_ERROR, result.error.flatten()));
      return;
    }

    next();
  };
}
