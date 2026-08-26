import { z } from "zod";

/**
 * Validator schema for resume operations targeting single resource ids
 */
export const resumeIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid resume ID format"),
  }),
});

/**
 * Validator schema for mock metadata resume attributes if sent in request body
 */
export const createResumeMetadataSchema = z.object({
  body: z.object({
    fileName: z.string().min(1, "File name is required").trim(),
    originalName: z.string().min(1, "Original name is required").trim(),
    fileUrl: z.string().url("File URL must be a valid URL").trim(),
    fileType: z.string().min(1, "File type is required").trim(),
    fileSize: z.number().positive("File size must be a positive integer"),
    storageProvider: z.string().optional(),
    analysisStatus: z.enum(["pending", "processing", "completed", "failed"]).optional(),
  }),
});

/**
 * Validator schema for resume history query parameters (pagination)
 */
export const resumeHistoryQuerySchema = z.object({
  query: z
    .object({
      page: z
        .string()
        .regex(/^[1-9]\d*$/, "Page must be a positive integer")
        .optional(),
      limit: z
        .string()
        .regex(/^[1-9]\d*$/, "Limit must be a positive integer")
        .optional(),
    })
    .optional(),
});
