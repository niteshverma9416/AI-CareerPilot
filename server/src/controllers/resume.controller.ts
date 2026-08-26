import type { NextFunction, Request, Response } from "express";
import { resumeService } from "@/services/resume.service";
import { HTTP_STATUS } from "@/constants/httpStatus";
import { ApiError } from "@/utils/ApiError";

export class ResumeController {
  /**
   * POST /api/v1/resume/upload
   * Handle resume file upload, save metadata to MongoDB.
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
        name: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        url: `/uploads/${req.file.filename}`,
      };

      const resume = await resumeService.uploadResume(userId, fileMeta);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "Resume uploaded successfully",
        resume,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/v1/resume
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
   * GET /api/v1/resume/history
   * Fetch paginated resume history for the authenticated user.
   */
  getResumeHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?._id?.toString() || req.user?.id;
      if (!userId) {
        throw ApiError.unauthorized("Authentication required");
      }

      const page = req.query.page ? Math.max(1, parseInt(req.query.page as string, 10)) : 1;
      const limit = req.query.limit ? Math.max(1, parseInt(req.query.limit as string, 10)) : 10;

      const history = await resumeService.getResumeHistory(userId, page, limit);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        currentPage: history.currentPage,
        totalPages: history.totalPages,
        totalResumes: history.totalResumes,
        resumes: history.resumes,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/v1/resume (Latest)
   * Fetch the latest resume uploaded by the authenticated user.
   */
  getLatestResume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?._id?.toString() || req.user?.id;
      if (!userId) {
        throw ApiError.unauthorized("Authentication required");
      }

      const resume = await resumeService.getLatestResume(userId);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        resume,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/v1/resume/:id
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
   * DELETE /api/v1/resume/:id
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
   * POST /api/v1/resume/:id/analyze
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
