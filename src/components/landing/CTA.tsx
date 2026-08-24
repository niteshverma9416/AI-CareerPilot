import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { paths } from "@/constants";

export function CTA() {
  return (
    <section className="py-24 bg-[#0B1120] relative overflow-hidden">
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Glow Banner Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[32px] p-8 md:p-16 overflow-hidden border border-slate-800 bg-gradient-to-r from-[#0F172A]/80 via-[#0B1120]/90 to-[#0F172A]/80 text-center space-y-8 shadow-2xl"
        >
          {/* Inner Grid decoration */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Icon Header */}
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="h-6 w-6" />
          </div>

          {/* Headline */}
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Ready to Accelerate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Career?
              </span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Upload your resume now to instantly discover missing skills, calculate compatibility with leading jobs, and practice interview scripts customized to your exact path.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={paths.register}
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-95 transition-all duration-300 hover:scale-[1.02] group"
            >
              Start Free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => {
                const pricingSec = document.querySelector("#pricing");
                if (pricingSec) pricingSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="py-3.5 px-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white transition-all text-sm font-semibold hover:scale-[1.02]"
            >
              View Demo
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
