import { Compass } from "lucide-react";
import { Link } from "react-router";
import { APP_NAME, paths } from "@/constants";
import { cn } from "@/utils/cn";

type LogoProps = {
  compact?: boolean;
  className?: string;
  to?: string;
};

export function Logo({ compact = false, className, to = paths.home }: LogoProps) {
  return (
    <Link to={to} className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
        <Compass className="h-5 w-5" />
      </span>
      {!compact ? (
        <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
          {APP_NAME}
        </span>
      ) : null}
    </Link>
  );
}
