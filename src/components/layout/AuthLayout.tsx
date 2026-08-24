import { Outlet, useLocation } from "react-router";
import { paths } from "@/constants";

export function AuthLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === paths.login || location.pathname === paths.register;

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-full min-w-full flex items-center justify-center bg-[#0B1120] bg-grid-pattern py-16 px-6 sm:px-12 relative overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-indigo-600/10 blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-cyan-600/10 blur-[90px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "-6s" }} />

      <div className="w-full max-w-lg relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
export default AuthLayout;
