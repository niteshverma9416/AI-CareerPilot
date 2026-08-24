import { Types } from "mongoose";
import { resumeRepository } from "../repositories/resume.repository";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import type { IResumeDocument } from "../models/resume.model";

export class ResumeService {
  /**
   * Mock upload a resume document details.
   */
  async uploadResume(
    userId: string,
    fileMeta: { name: string; size: number; mimeType?: string; url?: string }
  ): Promise<IResumeDocument> {
    const resumeData = {
      userId: new Types.ObjectId(userId),
      fileName: `${Date.now()}-${fileMeta.name}`,
      originalName: fileMeta.name,
      fileUrl: fileMeta.url || `https://api.carrerpilot.local/uploads/${Date.now()}-${fileMeta.name}`,
      fileType: fileMeta.mimeType || "application/pdf",
      fileSize: fileMeta.size,
      storageProvider: "local",
      analysisStatus: "pending",
      atsScore: undefined,
      resumeScore: undefined,
    };

    return resumeRepository.create(resumeData);
  }

  /**
   * Get all resumes matching a user ID.
   */
  async getAllResumes(userId: string): Promise<IResumeDocument[]> {
    return resumeRepository.findAllByUserId(userId);
  }

  /**
   * Get a single resume by its ID, checking user ownership.
   */
  async getResumeById(userId: string, resumeId: string): Promise<IResumeDocument> {
    const resume = await resumeRepository.findById(resumeId);
    if (!resume) {
      throw ApiError.notFound("Resume not found");
    }

    if (resume.userId.toString() !== userId) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, "You do not have access to this resume");
    }

    return resume;
  }

  /**
   * Delete a resume by its ID, checking user ownership.
   */
  async deleteResume(userId: string, resumeId: string): Promise<{ success: boolean; message: string }> {
    const resume = await this.getResumeById(userId, resumeId);
    await resumeRepository.delete(resume._id.toString());
    return { success: true, message: "Resume deleted successfully" };
  }

  /**
   * Analyze a resume (mocking AI evaluation scores).
   */
  async analyzeResume(userId: string, resumeId: string): Promise<IResumeDocument> {
    const resume = await this.getResumeById(userId, resumeId);
    
    // Generate simulated AI analysis results
    const mockScore = Math.floor(Math.random() * 20) + 75; // 75 - 95
    const mockResumeScore = Math.floor(Math.random() * 15) + 80; // 80 - 95

    const updated = await resumeRepository.update(resume._id.toString(), {
      atsScore: mockScore,
      resumeScore: mockResumeScore,
      analysisStatus: "completed",
    });

    if (!updated) {
      throw ApiError.internal("Failed to update analysis results");
    }

    return updated;
  }
}

export const resumeService = new ResumeService();
export default resumeService;
