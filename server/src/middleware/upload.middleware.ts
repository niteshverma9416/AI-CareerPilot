import path from "node:path";
import fs from "node:fs";
import multer from "multer";
import { ApiError } from "../utils/ApiError";

// Define the temporary upload storage path
const uploadDir = path.resolve(process.cwd(), "uploads");

// Verify that the upload folder exists on workspace startup
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    // Avoid spacing inconsistencies by mapping whitespaces to underscores
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

// File filter restricting types to PDF, DOC, and DOCX format extensions only
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(ApiError.badRequest("Only PDF, DOC, and DOCX files are allowed"));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter,
});
export default upload;
