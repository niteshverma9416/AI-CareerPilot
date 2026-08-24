import { Schema, model, type Document } from "mongoose";
import type { IResume } from "../types/resume.types";

export type IResumeDocument = IResume & Document;

const resumeSchema = new Schema<IResumeDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    fileName: {
      type: String,
      required: [true, "File name is required"],
      trim: true,
    },
    originalName: {
      type: String,
      required: [true, "Original name is required"],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
    },
    fileType: {
      type: String,
      required: [true, "File type is required"],
      trim: true,
    },
    fileSize: {
      type: Number,
      required: [true, "File size is required"],
    },
    storageProvider: {
      type: String,
      default: "local",
    },
    analysisStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    atsScore: {
      type: Number,
      default: null,
    },
    resumeScore: {
      type: Number,
      default: null,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Resume = model<IResumeDocument>("Resume", resumeSchema);
export default Resume;
