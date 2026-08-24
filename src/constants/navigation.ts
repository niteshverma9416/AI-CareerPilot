import {
  AudioLines,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  FileText,
  Github,
  LayoutDashboard,
  Route,
  Settings,
  UserRound,
} from "lucide-react";
import type { NavItem } from "@/types";
import { paths } from "./paths";

export const mainNavItems: NavItem[] = [
  { label: "Dashboard", path: paths.dashboard, icon: LayoutDashboard },
  { label: "Resume Analyzer", path: paths.resume, icon: FileText },
  { label: "Job Matcher", path: paths.jobs, icon: BriefcaseBusiness },
  { label: "Skill Gap", path: paths.skillGap, icon: ChartNoAxesColumn },
  { label: "Roadmap", path: paths.roadmap, icon: Route },
  { label: "AI Assistant", path: paths.assistant, icon: Bot },
  { label: "Interview", path: paths.interview, icon: AudioLines },
  { label: "GitHub Analyzer", path: paths.github, icon: Github },
];

export const accountNavItems: NavItem[] = [
  { label: "Profile", path: paths.profile, icon: UserRound },
  { label: "Settings", path: paths.settings, icon: Settings },
];
