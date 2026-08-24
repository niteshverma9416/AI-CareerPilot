import { Types } from "mongoose";

export interface IResume {
  userId: Types.ObjectId;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  storageProvider?: string;
  analysisStatus?: "pending" | "processing" | "completed" | "failed" | string;
  atsScore?: number;
  resumeScore?: number;
  uploadedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
