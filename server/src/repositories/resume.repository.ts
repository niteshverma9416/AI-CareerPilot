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
   * Fetch paginated resumes uploaded by a specific user (sorted by uploadedAt descending).
   */
  async findHistoryByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ resumes: IResumeDocument[]; totalResumes: number }> {
    const skip = (page - 1) * limit;
    const [resumes, totalResumes] = await Promise.all([
      Resume.find({ userId })
        .sort({ uploadedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Resume.countDocuments({ userId }),
    ]);

    return { resumes, totalResumes };
  }

  /**
   * Fetch the latest resume uploaded by a specific user (sorted by uploadedAt descending).
   */
  async findLatestByUserId(userId: string): Promise<IResumeDocument | null> {
    return Resume.findOne({ userId }).sort({ uploadedAt: -1, createdAt: -1 });
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
