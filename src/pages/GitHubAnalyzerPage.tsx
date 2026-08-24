import { Github } from "lucide-react";
import { PagePlaceholder } from "@/components/common";

export function GitHubAnalyzerPage() {
  return (
    <PagePlaceholder
      title="GitHub Analyzer"
      description="Review repositories, languages, and project strength for career positioning."
      icon={Github}
    />
  );
}
