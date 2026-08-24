import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "@/services/api/resumeApi";

/**
 * Hook to manage fetching the user's latest resume.
 * Converts 404 response errors into a successful null state (representing an empty state).
 */
export function useLatestResumeQuery() {
  return useQuery({
    queryKey: ["latestResume"],
    queryFn: async () => {
      try {
        const response = await resumeApi.getLatestResume();
        return response.resume || null;
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    retry: (failureCount, error: any) => {
      // Do not retry on client credentials or missing resource errors
      if (error.response?.status === 404 || error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Hook to manage fetching all user resumes list.
 */
export function useResumesQuery() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: () => resumeApi.getAllResumes(),
  });
}

/**
 * Hook to manage upload resume mutation lifecycle.
 */
export function useUploadResumeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => resumeApi.uploadResume(file),
    onSuccess: () => {
      // Invalidate both latestResume and resumes list caches to refresh values
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}

/**
 * Hook to manage delete resume mutation.
 */
export function useDeleteResumeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resumeApi.deleteResume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}

/**
 * Hook to manage AI ATS resume analysis evaluation mutation.
 */
export function useAnalyzeResumeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resumeApi.analyzeResume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}
