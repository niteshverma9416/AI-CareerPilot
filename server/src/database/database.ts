import mongoose from "mongoose";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";

export async function connectDatabase(): Promise<void> {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.MONGO_URI);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection failed. API will still start.", {
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
