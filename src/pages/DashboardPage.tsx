import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FileText,
  BarChart,
  BriefcaseBusiness,
  Trophy,
  Map,
  Upload,
  Sparkles,
  Play,
  Search,
  Plus,
  Clock,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { paths } from "@/constants";

export function DashboardPage() {
  // Read user from localStorage to display a personalized greeting
  const userJson = localStorage.getItem("user");
  let fullName = "Developer";
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      if (user?.fullName) {
        fullName = user.fullName;
      }
    } catch {
      // Fallback if parsing fails
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const stats = [
    {
      title: "Resume Score",
      value: "85/100",
      desc: "Good score. 3 recommendations.",
      icon: FileText,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      progress: 85,
    },
    {
      title: "ATS Compatibility",
      value: "92%",
      desc: "Excellent matching level.",
      icon: BarChart,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      progress: 92,
    },
    {
      title: "Job Matching Rate",
      value: "88%",
      desc: "14 matched jobs match profile.",
      icon: BriefcaseBusiness,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      progress: 88,
    },
    {
      title: "Interview Score",
      value: "78%",
      desc: "Average score. Target is 85%.",
      icon: Trophy,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      progress: 78,
    },
    {
      title: "Learning Progress",
      value: "3/5",
      desc: "Roadmap steps completed.",
      icon: Map,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      progress: 60,
    },
  ];

  const quickActions = [
    {
      title: "Upload Resume",
      desc: "Optimize file format",
      icon: Upload,
      path: paths.resume,
      color: "from-indigo-500/20 to-indigo-600/10 hover:border-indigo-500/40 text-indigo-400",
    },
    {
      title: "Generate Roadmap",
      desc: "Learn missing core skills",
      icon: Sparkles,
      path: paths.roadmap,
      color: "from-purple-500/20 to-purple-600/10 hover:border-purple-500/40 text-purple-400",
    },
    {
      title: "Start Interview",
      desc: "Mock with AI coach",
      icon: Play,
      path: paths.interview,
      color: "from-amber-500/20 to-amber-600/10 hover:border-amber-500/40 text-amber-400",
    },
    {
      title: "Analyze Resume",
      desc: "Check keywords count",
      icon: Search,
      path: paths.resume,
      color: "from-cyan-500/20 to-cyan-600/10 hover:border-cyan-500/40 text-cyan-400",
    },
  ];

  const activities = [
    {
      title: "ATS score audit completed",
      desc: "Scored 92% on Senior Web Architect matching checklist.",
      time: "2 hours ago",
      icon: BarChart,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10",
    },
    {
      title: "Mock Interview finished",
      desc: "Scored 78% on React & JavaScript architectural questions.",
      time: "1 day ago",
      icon: Trophy,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10",
    },
    {
      title: "Resume parsed successfully",
      desc: "Added 4 missing keyword tags (Docker, Next.js, Zod, CI/CD).",
      time: "2 days ago",
      icon: FileText,
      iconColor: "text-indigo-400",
      iconBg: "bg-indigo-500/10",
    },
    {
      title: "Learning Roadmap stage updated",
      desc: "Completed module: 'State management using TanStack Query'.",
      time: "3 days ago",
      icon: Map,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* 1. Hero Welcome Header Banner */}
      <motion.div
        variants={itemVariants}
        className="p-8 rounded-[24px] border border-slate-800 bg-gradient-to-r from-[#0F172A] via-[#090F1E] to-[#0F172A] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 blur-[60px] pointer-events-none rounded-full" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-2">
            <TrendingUp className="h-3.5 w-3.5" />
            Workspace Active
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome Back, <span className="text-indigo-400">{fullName}</span> 👋
          </h1>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Ready to scale your next role? Track your resume efficiency levels, test interview questions with AI coaches, and master missing skills.
          </p>
        </div>
      </motion.div>

      {/* 2. Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm flex flex-col justify-between h-40"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {stat.title}
              </span>
              <span className={`p-1.5 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-4.5 w-4.5" />
              </span>
            </div>

            <div className="mt-4 space-y-1.5">
              <span className="text-2xl font-extrabold text-white">
                {stat.value}
              </span>
              <span className="text-[10px] block text-slate-500 truncate leading-none">
                {stat.desc}
              </span>
            </div>

            {/* Micro progress line */}
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden mt-3">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500`}
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Bottom Grid: Timeline vs Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1 & 2: Recent Activity Timeline */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 p-6 md:p-8 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white tracking-tight">Recent Activity</h2>
              <p className="text-xs text-slate-500">Events logs from your last coaching tasks.</p>
            </div>
            <span className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer">
              View Logs
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="relative border-l border-slate-800 ml-4.5 pl-6 space-y-6 pt-1">
            {activities.map((activity) => (
              <div key={activity.title} className="relative group">
                {/* Connector Dot */}
                <span className={`absolute -left-[35px] top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full ring-4 ring-[#0B1120] ${activity.iconBg} ${activity.iconColor}`}>
                  <activity.icon className="h-2.5 w-2.5" />
                </span>
                
                {/* Details */}
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                    {activity.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {activity.desc}
                  </p>
                  <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Column 3: Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 p-6 md:p-8 rounded-[24px] border border-slate-800 bg-[#0F172A]/40 backdrop-blur-sm space-y-6"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white tracking-tight">Quick Actions</h2>
            <p className="text-xs text-slate-500">Jump straight to tool suites.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.path}
                className={`p-4 rounded-xl border border-slate-850 bg-gradient-to-br ${action.color} flex items-center justify-between hover:scale-[1.02] active:scale-98 transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-slate-950/60 text-inherit border border-slate-850/40">
                    <action.icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-slate-100 transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {action.desc}
                    </p>
                  </div>
                </div>
                <Plus className="h-4 w-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>

      </div>

    </motion.div>
  );
}
export default DashboardPage;
