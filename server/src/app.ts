import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "@/config/env";
import { API_PREFIX } from "@/constants";
import {
  apiRateLimiter,
  errorHandler,
  notFoundHandler,
  requestLogger,
} from "@/middleware";
import { v1Router } from "@/routes";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(API_PREFIX, apiRateLimiter);
app.use(API_PREFIX, v1Router);
app.use(notFoundHandler);
app.use(errorHandler);
