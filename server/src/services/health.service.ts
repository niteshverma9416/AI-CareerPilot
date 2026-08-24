import { env } from "@/config/env";
import { MESSAGES } from "@/constants";
import type { IHealthStatus } from "@/interfaces";

export function getHealthStatus(): IHealthStatus {
  return {
    success: true,
    message: MESSAGES.API_RUNNING,
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  };
}
