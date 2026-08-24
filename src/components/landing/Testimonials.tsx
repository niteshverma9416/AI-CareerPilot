import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Amit Sharma",
      role: "Software Developer at Google",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The ATS Score Analyzer is incredibly accurate! I revised my resume keywords based on the recommendations and received three Tier-1 interview callbacks within a week.",
      rating: 5,
    },
    {
      name: "Sarah Jenkins",
      role: "Frontend Engineer at Stripe",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      content: "The Mock Interview module was a total game-changer. Getting real-time coding transcripts and feedback pointing out vocabulary errors helped me ace the final rounds.",
      rating: 5,
    },
    {
      name: "Nikhil Verma",
      role: "Full Stack Engineer at Razorpay",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "AI CareerPilot mapped out a 4-week roadmap specifying libraries and database architectures I was missing. It made transition planning completely frictionless.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-[#0B1120] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

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
            Reviews
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
          >
            Loved by Developers & Job Seekers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            See how developers are using AI CareerPilot to optimize their applications and pass code interviews.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-[20px] border border-slate-800/80 bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/10 flex flex-col justify-between relative hover:border-slate-700/50 hover:bg-slate-900/40 transition-all duration-300"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Content */}
              <p className="text-slate-300 text-sm leading-relaxed mb-8 italic">
                &ldquo;{test.content}&rdquo;
              </p>

              {/* User Bio */}
              <div className="flex items-center gap-4 border-t border-slate-800/50 pt-5 mt-auto">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-12 h-12 rounded-full border border-slate-800 object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{test.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
