import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";

type PagePlaceholderProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function PagePlaceholder({
  title,
  description,
  icon: Icon,
}: PagePlaceholderProps) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-600/15 dark:text-brand-100">
            <Icon className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 md:text-base">
          {description}
        </p>
      </header>

      <Card className="flex min-h-72 flex-col items-center justify-center border-dashed p-10 text-center">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Module scaffolded and ready
        </p>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Business logic, data fetching, and AI features will be added in a
          later phase. This page currently provides the layout and route only.
        </p>
      </Card>
    </div>
  );
}
