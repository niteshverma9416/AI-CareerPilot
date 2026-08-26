export interface IResume {
  _id: string;
  userId?: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  storageProvider?: string;
  analysisStatus?: "pending" | "processing" | "completed" | "failed" | string;
  atsScore?: number | null;
  resumeScore?: number | null;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetResumeResponse {
  success: boolean;
  resume?: IResume;
  message?: string;
}

export interface IUploadResumeResponse {
  success: boolean;
  message: string;
  resume: IResume;
}

export interface IResumeHistoryResponse {
  success: boolean;
  currentPage: number;
  totalPages: number;
  totalResumes: number;
  resumes: IResume[];
}
