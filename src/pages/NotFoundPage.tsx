import { Link } from "react-router";
import { Button } from "@/components/ui";
import { paths } from "@/constants";

export function NotFoundPage() {
  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <div className="card-surface w-full max-w-md p-10 text-center">
        <p className="text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to={paths.home}>
          <Button className="mt-6">Return home</Button>
        </Link>
      </div>
    </div>
  );
}
