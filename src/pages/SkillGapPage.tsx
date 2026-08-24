import { ChartNoAxesColumn } from "lucide-react";
import { PagePlaceholder } from "@/components/common";

export function SkillGapPage() {
  return (
    <PagePlaceholder
      title="Skill Gap"
      description="Compare your current skills with target roles and identify what to learn next."
      icon={ChartNoAxesColumn}
    />
  );
}
