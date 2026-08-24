import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  initials?: string;
};

export function Avatar({
  initials = "AC",
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700 dark:bg-brand-600/20 dark:text-brand-100",
        className,
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
