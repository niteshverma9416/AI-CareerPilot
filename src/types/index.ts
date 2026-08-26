import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

export type Theme = "light" | "dark";

export * from "./resume.types";
