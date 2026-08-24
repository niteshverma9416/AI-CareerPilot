import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export function Statistics() {
  const stats: StatItem[] = [
    {
      value: 1000,
      suffix: "+",
      label: "Resumes Analyzed",
      description: "Successfully parsed and audited using AI.",
    },
    {
      value: 95,
      suffix: "%",
      label: "ATS Accuracy",
      description: "Direct match match-rate alignment with scanners.",
    },
    {
      value: 500,
      suffix: "+",
      label: "Career Roadmaps",
      description: "Personalized learning maps created.",
    },
    {
      value: 10,
      suffix: "K+",
      label: "Interview Questions",
      description: "Technical & behavioral questions generated.",
    },
  ];

  return (
    <section className="py-20 bg-[#070D19]/40 border-y border-slate-800/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-base font-bold text-white uppercase tracking-wider">{stat.label}</div>
              <div className="text-xs text-slate-400 max-w-[180px] mx-auto leading-relaxed">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix = "", duration = 1.5 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(10, Math.floor(totalMiliseconds / end));

      const timer = setInterval(() => {
        // Safe incremental count calculations
        const step = Math.max(1, Math.ceil(end / (totalMiliseconds / incrementTime)));
        start += step;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
