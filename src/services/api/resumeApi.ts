import { apiClient } from "./client";

export const resumeApi = {
  /**
   * Upload a single resume file parameter (multipart/form-data)
   */
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await apiClient.post("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Fetch the latest resume uploaded by the authenticated user
   */
  getLatestResume: async () => {
    const response = await apiClient.get("/resume");
    return response.data;
  },

  /**
   * Fetch all resumes uploaded by the authenticated user
   */
  getAllResumes: async () => {
    const response = await apiClient.get("/resume");
    return response.data;
  },

  /**
   * Delete a resume record by ID
   */
  deleteResume: async (id: string) => {
    const response = await apiClient.delete(`/resume/${id}`);
    return response.data;
  },

  /**
   * Trigger AI ATS resume analysis evaluation
   */
  analyzeResume: async (id: string) => {
    const response = await apiClient.post(`/resume/${id}/analyze`);
    return response.data;
  },
};

export default resumeApi;
