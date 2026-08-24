import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui";
import { paths } from "@/constants";
import { useTheme } from "@/context";

type TopNavProps = {
  onMenuClick: () => void;
};

export function TopNav({ onMenuClick }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();

  // Read user from localStorage to display personalized initials in avatar
  const userJson = localStorage.getItem("user");
  let initials = "US";
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      if (user?.fullName) {
        initials = user.fullName
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
      }
    } catch {
      // Fallback if parsing fails
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-900 bg-[#0B1120]/80 px-4 backdrop-blur-md lg:px-8">
      {/* Mobile Drawer Trigger */}
      <button
        type="button"
        className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Workspace Search (Desktop) */}
      <div className="relative mx-auto hidden w-full max-w-xs md:block lg:mx-0">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input
          type="search"
          placeholder="Search workspace..."
          className="pl-9 h-9 text-xs rounded-xl bg-slate-950/40 border-slate-800 text-slate-300 placeholder-slate-600 focus:border-indigo-500/50 focus:ring-indigo-500/20"
          aria-label="Search"
          readOnly
        />
      </div>

      {/* Actions (Notifications, Theme Toggle, Profile Avatar) */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <button
          type="button"
          onClick={() => alert("No new notifications.")}
          className="rounded-xl p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-200 relative transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 ring-2 ring-[#0B1120]" />
        </button>

        {/* Theme Selector */}
        <button
          type="button"
          className="rounded-xl p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </button>

        {/* User initials badge */}
        <Link
          to={paths.profile}
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-xs font-bold text-white shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="User profile"
        >
          {initials}
        </Link>
      </div>
    </header>
  );
}
export default TopNav;
