import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Cpu, UserCheck, AlertTriangle, Video, Github } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Features() {
  const features: Feature[] = [
    {
      icon: <FileText className="h-6 w-6 text-indigo-400" />,
      title: "AI Resume Analyzer",
      description: "Get detailed, actionable feedback on your resume structure, impact, phrasing, and visual layout within seconds.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-cyan-400" />,
      title: "ATS Resume Score",
      description: "Calculate your resume compliance score against industry ATS algorithms and optimize keywords to pass filters.",
    },
    {
      icon: <UserCheck className="h-6 w-6 text-indigo-400" />,
      title: "Smart Job Matching",
      description: "Match your skills and preferences against thousands of real job postings with high precision percentiles.",
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-cyan-400" />,
      title: "Skill Gap Analysis",
      description: "Identify key programming languages, tools, and methodologies missing from your profile for target roles.",
    },
    {
      icon: <Video className="h-6 w-6 text-indigo-400" />,
      title: "AI Mock Interview",
      description: "Practice technical and behavioral interviews with real-time video feedback, grading, and transcript improvement tips.",
    },
    {
      icon: <Github className="h-6 w-6 text-cyan-400" />,
      title: "GitHub Profile Analyzer",
      description: "Audit your public repositories, commits, and contribution chart to generate showcase highlights for recruiters.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#0B1120] relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-400 uppercase tracking-wider"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
          >
            Powerful AI Tools to Fast-Track Your Placement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            Unlock the power of automated career coaching, built directly using LLMs to mimic recruiters and tech panels.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.title} feature={feature} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Individual card with Vercel spotlight cursor tracking
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group p-8 rounded-[20px] border border-slate-800/80 bg-slate-900/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-slate-700/50 shadow-lg shadow-black/10"
    >
      {/* Mouse Spotlight Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(99,102,241,0.06),transparent_80%)]"
          style={
            {
              "--mouse-x": `${coords.x}px`,
              "--mouse-y": `${coords.y}px`,
            } as React.CSSProperties
          }
        />
      )}

      {/* Decorative Glow Border */}
      <div className="absolute inset-0 rounded-[20px] pointer-events-none border border-transparent group-hover:border-indigo-500/20 transition-colors duration-300" />

      {/* Feature Content */}
      <div className="space-y-5 relative z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-850 border border-slate-800 transition-colors duration-300 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
          {feature.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
