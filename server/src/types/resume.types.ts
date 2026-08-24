import { Types } from "mongoose";

export interface IResume {
  userId: Types.ObjectId;
  fileName: string;
  fileKey: string;
  fileSize: number;
  fileUrl: string;
  atsScore?: number;
  analysis?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
