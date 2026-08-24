import { UserRound } from "lucide-react";
import { PagePlaceholder } from "@/components/common";

export function ProfilePage() {
  return (
    <PagePlaceholder
      title="Profile"
      description="Manage your personal details, career goals, and public-facing profile."
      icon={UserRound}
    />
  );
}
