import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 bg-grid-pattern relative overflow-hidden">
      {/* Layout Blurs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Sidebar navigation */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
export default AppLayout;
