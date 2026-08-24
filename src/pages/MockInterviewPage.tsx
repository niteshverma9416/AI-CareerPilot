import { AudioLines } from "lucide-react";
import { PagePlaceholder } from "@/components/common";

export function MockInterviewPage() {
  return (
    <PagePlaceholder
      title="Mock Interview"
      description="Practice interviews with structured prompts, scoring, and feedback."
      icon={AudioLines}
    />
  );
}
