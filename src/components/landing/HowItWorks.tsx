import { motion } from "framer-motion";
import { UploadCloud, Zap, GitPullRequest, Award } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function HowItWorks() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Upload Resume",
      description: "Drag and drop your current PDF or DOCX resume. Our systems parse your data instantly.",
      icon: <UploadCloud className="h-6 w-6 text-indigo-400" />,
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our LLM scans details against real-world recruiter preferences and ATS keyword matching algorithms.",
      icon: <Zap className="h-6 w-6 text-cyan-400" />,
    },
    {
      number: "03",
      title: "Personalized Roadmap",
      description: "Identify skill gaps and receive a tailored timeline of recommended libraries, mock prompts, and projects.",
      icon: <GitPullRequest className="h-6 w-6 text-indigo-400" />,
    },
    {
      number: "04",
      title: "Get Your Dream Job",
      description: "Practice mock behavioral videos, track metrics, match with vacancies, and apply with maximum readiness.",
      icon: <Award className="h-6 w-6 text-cyan-400" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#070D19]/40 border-y border-slate-800/40 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-400 uppercase tracking-wider"
          >
            Workflow
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
          >
            How AI CareerPilot Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            Four simple stages that transform your job search from guess-work to data-backed strategy.
          </motion.p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[68px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-indigo-500/30 via-cyan-500/50 to-indigo-500/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center space-y-5 group"
              >
                {/* Circle Icon Badge */}
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-slate-800 bg-slate-900/60 transition-all duration-300 group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  {/* Floating Number */}
                  <span className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-slate-850 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-indigo-400 transition-colors">
                    {step.number}
                  </span>
                  {step.icon}
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[240px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
