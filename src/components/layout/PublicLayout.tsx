import { Link, Outlet } from "react-router";
import { Logo } from "@/components/common";
import { Button } from "@/components/ui";
import { paths } from "@/constants";

export function PublicLayout() {
  return (
    <div className="min-h-full">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
          <Logo />
          <div className="flex items-center gap-2">
            <Link to={paths.login}>
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to={paths.register}>
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
