import { Router } from "express";
import { resumeController } from "@/controllers/resume.controller";
import { authenticate, validate } from "@/middleware";
import { resumeUpload } from "@/middleware/resumeUpload.middleware";
import { resumeIdParamSchema } from "@/validators/resume.validator";

const resumeRouter = Router();

// All resume routes require authentication
resumeRouter.use(authenticate);

resumeRouter.post("/", resumeUpload, resumeController.uploadResume);
resumeRouter.get("/", resumeController.getAllResumes);
resumeRouter.get("/:id", validate(resumeIdParamSchema), resumeController.getResumeById);
resumeRouter.delete("/:id", validate(resumeIdParamSchema), resumeController.deleteResume);
resumeRouter.post("/:id/analyze", validate(resumeIdParamSchema), resumeController.analyzeResume);

export { resumeRouter };
export default resumeRouter;
