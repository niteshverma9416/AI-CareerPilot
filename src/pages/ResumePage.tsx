import { FileText } from "lucide-react";
import { PagePlaceholder } from "@/components/common";

export function ResumePage() {
  return (
    <PagePlaceholder
      title="Resume Analyzer"
      description="Upload and review resumes. AI scoring and rewrite suggestions will be added later."
      icon={FileText}
    />
  );
}
