import { Router } from "express";
import { authController } from "@/controllers/auth.controller";
import { authenticate, validate } from "@/middleware";
import { registerSchema, loginSchema } from "@/validators";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.get("/me", authenticate, authController.getMe);
authRouter.post("/logout", authController.logout);

export { authRouter };
