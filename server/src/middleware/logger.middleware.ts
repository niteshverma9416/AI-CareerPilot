import morgan from "morgan";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";

const format = env.NODE_ENV === "production" ? "combined" : "dev";

export const requestLogger = morgan(format, {
  stream: {
    write: (message: string) => {
      logger.info(message.trim());
    },
  },
});
