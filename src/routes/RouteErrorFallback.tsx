import { isRouteErrorResponse, useRouteError } from "react-router";
import { Button } from "@/components/ui";
import { paths } from "@/constants";

export function RouteErrorFallback() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "An unexpected error occurred.";

  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <div className="card-surface w-full max-w-md p-8 text-center">
        <p className="text-sm font-medium text-brand-600">Route error</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          This page could not be loaded
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{message}</p>
        <a href={paths.home}>
          <Button className="mt-6">Back to home</Button>
        </a>
      </div>
    </div>
  );
}
