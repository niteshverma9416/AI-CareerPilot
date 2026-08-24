import { Route } from "lucide-react";
import { PagePlaceholder } from "@/components/common";

export function LearningRoadmapPage() {
  return (
    <PagePlaceholder
      title="Learning Roadmap"
      description="A sequenced learning path toward your target role will be generated here."
      icon={Route}
    />
  );
}
