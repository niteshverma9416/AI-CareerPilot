import { Link } from "react-router";
import { Compass, Sparkles } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { APP_NAME, APP_TAGLINE, paths } from "@/constants";

export function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="max-w-2xl space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-600/15 dark:text-brand-100">
          <Sparkles className="h-3.5 w-3.5" />
          Frontend architecture ready
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {APP_NAME}
        </h1>
        <p className="text-lg leading-8 text-slate-500 dark:text-slate-400">
          {APP_TAGLINE}. Plan skills, refine your resume, match jobs, and
          prepare for interviews from one workspace.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to={paths.register}>
            <Button size="lg">Create account</Button>
          </Link>
          <Link to={paths.login}>
            <Button size="lg" variant="secondary">
              Sign in
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          "Resume analysis",
          "Job matching",
          "Learning roadmaps",
        ].map((item) => (
          <Card key={item} className="p-5">
            <Compass className="h-5 w-5 text-brand-600" />
            <p className="mt-3 font-medium">{item}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Placeholder module. Product logic will land in a later phase.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
