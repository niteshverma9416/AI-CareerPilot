import { LayoutDashboard } from "lucide-react";
import { PagePlaceholder } from "@/components/common";

export function DashboardPage() {
  return (
    <PagePlaceholder
      title="Dashboard"
      description="Your career overview, recent activity, and recommended next steps will appear here."
      icon={LayoutDashboard}
    />
  );
}
