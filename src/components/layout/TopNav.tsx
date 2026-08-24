import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { Logo } from "@/components/common";
import { Avatar, Input } from "@/components/ui";
import { paths } from "@/constants";
import { useTheme } from "@/context";

type TopNavProps = {
  onMenuClick: () => void;
};

export function TopNav({ onMenuClick }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 lg:px-8">
      <button
        type="button"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="lg:hidden">
        <Logo compact to={paths.dashboard} />
      </div>

      <div className="relative mx-auto hidden w-full max-w-md md:block lg:mx-0">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          placeholder="Search workspace..."
          className="pl-9"
          aria-label="Search"
          readOnly
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
        <button
          type="button"
          className="ml-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="User profile"
        >
          <Avatar initials="JD" />
        </button>
      </div>
    </header>
  );
}
