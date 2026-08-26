/**
 * Format bytes into human readable string (e.g. 1.25 MB, 450 KB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format MIME type or file extension to friendly display name
 */
export function formatFileType(mimeOrType: string): string {
  if (!mimeOrType) return "Document";
  const lower = mimeOrType.toLowerCase();
  if (lower.includes("pdf")) return "PDF Document";
  if (lower.includes("word") || lower.includes("docx") || lower.includes("doc")) return "Word Document (DOCX)";
  return mimeOrType;
}

/**
 * Format ISO date string or Date object
 */
export function formatDate(dateStringOrDate?: string | Date): string {
  if (!dateStringOrDate) return "--";
  const d = new Date(dateStringOrDate);
  if (isNaN(d.getTime())) return "--";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
