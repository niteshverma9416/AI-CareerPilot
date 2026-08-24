import { Settings } from "lucide-react";
import { PagePlaceholder } from "@/components/common";

export function SettingsPage() {
  return (
    <PagePlaceholder
      title="Settings"
      description="Configure preferences, notifications, and workspace defaults."
      icon={Settings}
    />
  );
}
