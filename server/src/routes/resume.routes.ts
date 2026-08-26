import { Router } from "express";
import { resumeController } from "@/controllers/resume.controller";
import { authenticate, validate, upload } from "@/middleware";
import { resumeIdParamSchema, resumeHistoryQuerySchema } from "@/validators/resume.validator";

const resumeRouter = Router();

// All resume routes require authentication
resumeRouter.use(authenticate);

// POST /api/v1/resume/upload - accepts a single file parameter named "resume"
resumeRouter.post("/upload", upload.single("resume"), resumeController.uploadResume);

// GET /api/v1/resume/history - paginated resume history for the authenticated user
resumeRouter.get("/history", validate(resumeHistoryQuerySchema), resumeController.getResumeHistory);

resumeRouter.get("/", resumeController.getLatestResume);
resumeRouter.get("/:id", validate(resumeIdParamSchema), resumeController.getResumeById);
resumeRouter.delete("/:id", validate(resumeIdParamSchema), resumeController.deleteResume);
resumeRouter.post("/:id/analyze", validate(resumeIdParamSchema), resumeController.analyzeResume);

export { resumeRouter };
export default resumeRouter;

