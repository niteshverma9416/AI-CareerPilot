import rateLimit from "express-rate-limit";
import { HTTP_STATUS, MESSAGES } from "@/constants";

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  message: {
    success: false,
    message: MESSAGES.TOO_MANY_REQUESTS,
  },
});
