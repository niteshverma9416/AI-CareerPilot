import { Resume, type IResumeDocument } from "../models/resume.model";
import type { IResume } from "../types/resume.types";

export class ResumeRepository {
  /**
   * Create a new resume record in MongoDB.
   */
  async create(resumeData: Partial<IResume>): Promise<IResumeDocument> {
    return Resume.create(resumeData);
  }

  /**
   * Fetch all resumes uploaded by a specific user.
   */
  async findAllByUserId(userId: string): Promise<IResumeDocument[]> {
    return Resume.find({ userId }).sort({ createdAt: -1 });
  }

  /**
   * Fetch a single resume record by its unique ID.
   */
  async findById(id: string): Promise<IResumeDocument | null> {
    return Resume.findById(id);
  }

  /**
   * Delete a resume record by its unique ID.
   */
  async delete(id: string): Promise<IResumeDocument | null> {
    return Resume.findByIdAndDelete(id);
  }

  /**
   * Update details of an existing resume (e.g. ATS score, analysis).
   */
  async update(id: string, updateData: Partial<IResume>): Promise<IResumeDocument | null> {
    return Resume.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export const resumeRepository = new ResumeRepository();
export default resumeRepository;
