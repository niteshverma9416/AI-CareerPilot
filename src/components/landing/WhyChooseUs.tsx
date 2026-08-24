import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface ComparisonRow {
  feature: string;
  traditional: boolean | string;
  pilot: boolean | string;
}

export function WhyChooseUs() {
  const comparisonData: ComparisonRow[] = [
    {
      feature: "ATS Compliance Check",
      traditional: "Manual comparison",
      pilot: "Instant AI Keyword check",
    },
    {
      feature: "Resume Quality Audit",
      traditional: false,
      pilot: true,
    },
    {
      feature: "Smart Skills Gap Analysis",
      traditional: false,
      pilot: true,
    },
    {
      feature: "Interactive Mock Interviews",
      traditional: "Static questionnaires",
      pilot: "Real-time AI Video Feedback",
    },
    {
      feature: "Automated Skill Roadmaps",
      traditional: false,
      pilot: true,
    },
    {
      feature: "GitHub Audit & Summary",
      traditional: false,
      pilot: true,
    },
    {
      feature: "Match Rate per Vacancy",
      traditional: "Basic keyword match",
      pilot: "Full profile semantic scan",
    },
  ];

  return (
    <section className="py-24 bg-[#0B1120] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-400 uppercase tracking-wider"
          >
            Comparison
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
          >
            Why Choose AI CareerPilot?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            Discover how we compare against traditional resume builders and placement services.
          </motion.p>
        </div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-[24px] border border-slate-800 bg-slate-900/20 backdrop-blur-md shadow-2xl"
        >
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40">
                <th className="py-6 px-8 text-sm font-bold text-slate-300">Platform Features</th>
                <th className="py-6 px-8 text-sm font-bold text-slate-400">Traditional Platforms</th>
                <th className="py-6 px-8 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  AI CareerPilot
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={`border-b border-slate-800/60 hover:bg-slate-800/20 transition-colors ${
                    idx === comparisonData.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {/* Feature Name */}
                  <td className="py-5 px-8 text-sm font-semibold text-white">{row.feature}</td>

                  {/* Traditional Platform Cell */}
                  <td className="py-5 px-8 text-sm text-slate-400">
                    {typeof row.traditional === "string" ? (
                      row.traditional
                    ) : row.traditional ? (
                      <Check className="h-5 w-5 text-slate-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500/70" />
                    )}
                  </td>

                  {/* AI CareerPilot Cell */}
                  <td className="py-5 px-8 text-sm font-medium text-indigo-300">
                    {typeof row.pilot === "string" ? (
                      <div className="flex items-center gap-2 font-bold text-indigo-300">
                        <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                        {row.pilot}
                      </div>
                    ) : row.pilot ? (
                      <div className="flex items-center gap-2 font-bold text-indigo-300">
                        <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                        Available
                      </div>
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  );
}
