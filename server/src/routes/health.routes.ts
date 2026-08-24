import { Router } from "express";
import { getHealth } from "@/controllers/health.controller";
import { ROUTES } from "@/constants";

const healthRouter = Router();

healthRouter.get(ROUTES.HEALTH, getHealth);

export { healthRouter };
