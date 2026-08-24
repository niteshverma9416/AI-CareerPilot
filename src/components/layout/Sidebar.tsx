import { NavLink, useNavigate } from "react-router";
import { LogOut, X, Compass } from "lucide-react";
import { accountNavItems, mainNavItems, paths } from "@/constants";
import type { NavItem } from "@/types";
import { cn } from "@/utils/cn";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

function NavSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="space-y-1">
      <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 relative group",
              isActive
                ? "bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 pl-4"
                : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-100 hover:pl-4",
            )
          }
        >
          <item.icon className="h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-110" />
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate(paths.login);
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <button
        type="button"
        aria-label="Close sidebar overlay"
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-[2px] transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-900 bg-[#070D19]/95 backdrop-blur-md transition-transform duration-300 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Sidebar Header Brand Logo */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-slate-900/60">
          <NavLink to={paths.dashboard} className="inline-flex items-center gap-2.5 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]">
              <Compass className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
              AI CareerPilot
            </span>
          </NavLink>
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900/80 lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation Options */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6 scrollbar-thin">
          <NavSection title="Workspace" items={mainNavItems} onNavigate={onClose} />
          <NavSection title="Account" items={accountNavItems} onNavigate={onClose} />
        </nav>

        {/* Sidebar Footer Logout Button */}
        <div className="border-t border-slate-900 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
export default Sidebar;
