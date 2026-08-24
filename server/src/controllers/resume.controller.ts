import type { NextFunction, Request, Response } from "express";
import { resumeService } from "@/services/resume.service";
import { HTTP_STATUS } from "@/constants/httpStatus";
import { ApiError } from "@/utils/ApiError";

export class ResumeController {
  /**
   * POST /api/v1/resumes
   * Mock upload resume metadata and persist it.
   */
  uploadResume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?._id?.toString() || req.user?.id;
      if (!userId) {
        throw ApiError.unauthorized("Authentication required");
      }

      if (!req.file) {
        throw ApiError.badRequest("Resume file is required");
      }

      const fileMeta = {
        name: req.file.originalname,
        size: req.file.size,
      };

      const resume = await resumeService.uploadResume(userId, fileMeta);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "Resume metadata uploaded successfully",
        resume,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/v1/resumes
   * Fetch all resumes belonging to the authenticated user.
   */
  getAllResumes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?._id?.toString() || req.user?.id;
      if (!userId) {
        throw ApiError.unauthorized("Authentication required");
      }

      const resumes = await resumeService.getAllResumes(userId);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        resumes,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/v1/resumes/:id
   * Fetch a single resume record by ID, checking ownership.
   */
  getResumeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?._id?.toString() || req.user?.id;
      if (!userId) {
        throw ApiError.unauthorized("Authentication required");
      }

      const resumeId = req.params.id;
      const resume = await resumeService.getResumeById(userId, resumeId);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        resume,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /api/v1/resumes/:id
   * Delete a resume record by ID, checking ownership.
   */
  deleteResume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?._id?.toString() || req.user?.id;
      if (!userId) {
        throw ApiError.unauthorized("Authentication required");
      }

      const resumeId = req.params.id;
      const result = await resumeService.deleteResume(userId, resumeId);

      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/v1/resumes/:id/analyze
   * Analyze a resume (simulate AI keyword match analysis and score).
   */
  analyzeResume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?._id?.toString() || req.user?.id;
      if (!userId) {
        throw ApiError.unauthorized("Authentication required");
      }

      const resumeId = req.params.id;
      const resume = await resumeService.analyzeResume(userId, resumeId);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Resume analysis completed successfully",
        resume,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const resumeController = new ResumeController();
export default resumeController;
