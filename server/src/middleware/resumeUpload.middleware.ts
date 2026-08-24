import type { Request, Response, NextFunction } from "express";

/**
 * Boilerplate middleware shell simulating resume file uploads.
 * Bypasses actual storage uploading (e.g. S3/local write logic) as requested,
 * and attaches mock file metadata to the request for service consumption.
 */
export function resumeUpload(req: Request, _res: Response, next: NextFunction) {
  if (!req.file) {
    req.file = {
      fieldname: "resume",
      originalname: "nitesh_resume_uploaded.pdf",
      encoding: "7bit",
      mimetype: "application/pdf",
      size: 1240100, // ~1.2 MB
      destination: "",
      filename: "nitesh_resume_uploaded.pdf",
      path: "",
      buffer: Buffer.from(""),
    } as any;
  }
  
  next();
}
