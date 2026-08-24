import { env } from "@/config/env";
import { connectDatabase } from "@/database/database";
import { logger } from "@/utils/logger";
import { app } from "@/app";

async function bootstrap() {
  await connectDatabase();

  app.listen(env.PORT, () => {
    logger.info(`AI CareerPilot API listening on port ${env.PORT}`, {
      environment: env.NODE_ENV,
      health: `http://localhost:${env.PORT}/api/v1/health`,
    });
  });
}

bootstrap().catch((error: unknown) => {
  logger.error("Failed to start server", {
    error: error instanceof Error ? error.message : error,
  });
  process.exit(1);
});
