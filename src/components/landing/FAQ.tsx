import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does AI CareerPilot work?",
      answer: "AI CareerPilot parses your resume using natural language parsing to benchmark skills, experiences, and format layout against specific hiring profiles. It then uses AI algorithms to score compliance, trace missing requirements, and generate simulated panel interviews.",
    },
    {
      question: "Is my resume secure?",
      answer: "Absolutely. Your data privacy is our priority. All uploaded resumes are encrypted in transit and at rest, processed securely, and never shared with external recruiting agencies or used for general training datasets without your explicit consent.",
    },
    {
      question: "Can I upload PDF and DOCX?",
      answer: "Yes, our document parser supports both standard PDF documents and Microsoft Word (.docx) files. We recommend PDF formatting as it locks down structural dimensions, ensuring accurate ATS visual audits.",
    },
    {
      question: "How accurate is ATS scoring?",
      answer: "Our scoring engine is calibrated directly using public heuristics and proprietary test scans from major ATS systems (like Greenhouse, Lever, Workday, and Taleo), achieving over 95% scoring match alignment.",
    },
    {
      question: "Can I use it for free?",
      answer: "Yes, our Starter Plan is completely free, offering a single resume upload evaluation, basic ATS grading score, and a skill gap roadmap so you can test capabilities before upgrading.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0B1120] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-400 uppercase tracking-wider"
          >
            Questions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm"
          >
            Find answers to commonly asked questions regarding resume analysis, security, and pricing.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-[20px] border border-slate-800/80 bg-slate-900/20 backdrop-blur-md overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-6 px-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>

                {/* Accordion Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="pb-6 px-8 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
