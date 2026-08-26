import { apiClient } from "./client";
import type { IGetResumeResponse, IUploadResumeResponse, IResume, IResumeHistoryResponse } from "@/types";

export const resumeApi = {
  /**
   * Upload a single resume file parameter (multipart/form-data)
   */
  uploadResume: async (file: File): Promise<IUploadResumeResponse> => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await apiClient.post<IUploadResumeResponse>("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Fetch the latest resume uploaded by the authenticated user
   */
  getLatestResume: async (): Promise<IGetResumeResponse> => {
    const response = await apiClient.get<IGetResumeResponse>("/resume");
    return response.data;
  },

  /**
   * Fetch all resumes uploaded by the authenticated user
   */
  getAllResumes: async (): Promise<{ success: boolean; resumes: IResume[] }> => {
    const response = await apiClient.get<{ success: boolean; resumes: IResume[] }>("/resume");
    return response.data;
  },

  /**
   * Fetch paginated resume history for the authenticated user
   */
  getResumeHistory: async (page = 1, limit = 10): Promise<IResumeHistoryResponse> => {
    const response = await apiClient.get<IResumeHistoryResponse>(`/resume/history?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Delete a resume record by ID
   */
  deleteResume: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/resume/${id}`);
    return response.data;
  },

  /**
   * Trigger AI ATS resume analysis evaluation
   */
  analyzeResume: async (id: string): Promise<{ success: boolean; message: string; resume: IResume }> => {
    const response = await apiClient.post<{ success: boolean; message: string; resume: IResume }>(`/resume/${id}/analyze`);
    return response.data;
  },
};

export default resumeApi;
