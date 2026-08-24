import { Link } from "react-router";
import { Play, Sparkles, CheckCircle, BarChart, Trophy, Map } from "lucide-react";
import { motion } from "framer-motion";
import { paths } from "@/constants";

export function Hero() {
  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#0B1120] bg-grid-pattern"
    >
      {/* Background Animated Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-cyan-600/10 blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "-5s" }} />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-slate-500/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${Math.min(95, Math.max(5, 50 + p.x))}%`,
              top: `${Math.min(95, Math.max(5, 50 + p.y))}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-8">
            {/* Sparkle Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Powered by advanced AI models
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-white"
            >
              Your AI Career Coach for Landing Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                Dream Job
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed max-w-xl"
            >
              Analyze your resume, improve ATS score, prepare for interviews,
              discover skill gaps, and build your personalized learning roadmap using AI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                to={paths.register}
                className="w-full sm:w-auto text-center py-3.5 px-8 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-[1.02]"
              >
                Get Started
              </Link>
              <button
                onClick={() => {
                  const pricingSec = document.querySelector("#pricing");
                  if (pricingSec) pricingSec.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:text-white transition-all text-sm font-semibold text-slate-300 hover:scale-[1.02]"
              >
                <Play className="h-4 w-4 fill-slate-300 group-hover:fill-white" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Hero Right Mockup */}
          <div className="lg:col-span-6 relative w-full h-[450px] md:h-[550px] flex items-center justify-center">
            {/* Dashboard Mockup Panel (Standard glass layout) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[480px] h-[340px] md:h-[380px] rounded-[24px] border border-slate-800 bg-[#0F172A]/70 backdrop-blur-md shadow-2xl shadow-black/60 overflow-hidden"
            >
              {/* Fake Window Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-850 bg-slate-950/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[11px] font-semibold text-slate-500 tracking-wider">CAREER DASHBOARD</div>
                <div className="w-12 h-2" />
              </div>

              {/* Mockup Dashboard Content */}
              <div className="p-6 grid grid-cols-12 gap-4 h-full">
                <div className="col-span-7 flex flex-col gap-4">
                  <div className="h-10 w-2/3 rounded-lg bg-slate-800/40 animate-pulse" />
                  <div className="h-3 w-full rounded-md bg-slate-800/40 animate-pulse" />
                  <div className="h-3 w-4/5 rounded-md bg-slate-800/40 animate-pulse" />
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="h-12 rounded-lg bg-slate-850 border border-slate-800/50" />
                    <div className="h-12 rounded-lg bg-slate-850 border border-slate-800/50" />
                  </div>
                </div>
                <div className="col-span-5 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-[8px] border-slate-800/50 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-white">87</span>
                      <span className="text-[10px] block text-slate-400">Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Widget 1: ATS Score */}
            <motion.div
              initial={{ x: -40, y: -60, opacity: 0 }}
              animate={{ x: -20, y: -100, opacity: 1 }}
              drag
              dragConstraints={{ left: -100, right: 50, top: -200, bottom: 50 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              className="absolute cursor-grab active:cursor-grabbing p-4 w-40 glass-card rounded-[20px] shadow-lg flex items-center gap-3 border border-slate-700/30"
            >
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <BarChart className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">ATS Score</div>
                <div className="text-lg font-bold text-white">95% Excellent</div>
              </div>
            </motion.div>

            {/* Floating Widget 2: Resume Analysis */}
            <motion.div
              initial={{ x: 80, y: -120, opacity: 0 }}
              animate={{ x: 120, y: -140, opacity: 1 }}
              drag
              dragConstraints={{ left: 0, right: 200, top: -250, bottom: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              className="absolute cursor-grab active:cursor-grabbing p-4 w-52 glass-card rounded-[20px] shadow-lg border border-slate-700/30 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300">Resume Quality</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full font-semibold">Done</span>
              </div>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                    <span>Keywords Match</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1, delay: 0.8 }} className="h-full bg-cyan-400" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                    <span>Formatting</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} transition={{ duration: 1, delay: 0.9 }} className="h-full bg-indigo-400" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Widget 3: Job Match % */}
            <motion.div
              initial={{ x: -120, y: 100, opacity: 0 }}
              animate={{ x: -140, y: 110, opacity: 1 }}
              drag
              dragConstraints={{ left: -220, right: -20, top: 0, bottom: 200 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
              className="absolute cursor-grab active:cursor-grabbing p-4 w-44 glass-card rounded-[20px] shadow-lg flex items-center gap-3 border border-slate-700/30"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Job Matching</div>
                <div className="text-sm font-bold text-white">94% Match Rate</div>
              </div>
            </motion.div>

            {/* Floating Widget 4: Interview Score */}
            <motion.div
              initial={{ x: 120, y: 80, opacity: 0 }}
              animate={{ x: 140, y: 70, opacity: 1 }}
              drag
              dragConstraints={{ left: 0, right: 240, top: 0, bottom: 180 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
              className="absolute cursor-grab active:cursor-grabbing p-4 w-44 glass-card rounded-[20px] shadow-lg flex items-center gap-3 border border-slate-700/30"
            >
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Mock Interview</div>
                <div className="text-sm font-bold text-white">9.2 / 10 score</div>
              </div>
            </motion.div>

            {/* Floating Widget 5: Roadmap Progress */}
            <motion.div
              initial={{ x: 0, y: 150, opacity: 0 }}
              animate={{ x: 0, y: 180, opacity: 1 }}
              drag
              dragConstraints={{ left: -100, right: 100, top: 50, bottom: 250 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
              className="absolute cursor-grab active:cursor-grabbing p-4 w-52 glass-card rounded-[20px] shadow-lg flex items-center gap-3 border border-slate-700/30"
            >
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Map className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Roadmap Progress</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: "60%" }} />
                  </div>
                  <span className="text-[10px] font-bold text-white">3/5</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
