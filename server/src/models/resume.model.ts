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
    fileKey: {
      type: String,
      required: [true, "File key is required"],
      trim: true,
    },
    fileSize: {
      type: Number,
      required: [true, "File size is required"],
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    atsScore: {
      type: Number,
      default: null,
    },
    analysis: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Resume = model<IResumeDocument>("Resume", resumeSchema);
