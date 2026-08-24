import { LoaderCircle } from "lucide-react";
import { cn } from "@/utils/cn";

type LoadingProps = {
  label?: string;
  fullScreen?: boolean;
  className?: string;
};

export function Loading({
  label = "Loading",
  fullScreen = false,
  className,
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400",
        fullScreen && "min-h-full py-24",
        className,
      )}
    >
      <LoaderCircle className="h-8 w-8 animate-spin text-brand-600" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
