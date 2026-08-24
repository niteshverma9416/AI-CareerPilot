import { Link } from "react-router";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { paths } from "@/constants";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  link: string;
}

export function Pricing() {
  const plans: PricingPlan[] = [
    {
      name: "Starter",
      price: "₹0",
      period: "forever",
      description: "Essential career tools to audit your resume and draft your roadmap.",
      features: [
        "Single Resume Upload",
        "Basic ATS Compliance Score",
        "Initial Skill Gap Roadmap",
        "Community Support",
      ],
      cta: "Start for Free",
      popular: false,
      link: paths.register,
    },
    {
      name: "Professional",
      price: "₹499",
      period: "month",
      description: "Everything you need to practice interviews, analyze commits, and apply.",
      features: [
        "Unlimited Resume Analysis",
        "Smart Semantic Job Matching",
        "AI Mock Interview Video Practice",
        "GitHub Profile & Commit Audit",
        "Priority AI Processing Queues",
        "Email & Discord Support",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      link: paths.register,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored",
      description: "Specialized dashboards, APIs, and analytics for campuses and teams.",
      features: [
        "Custom AI Evaluation Rubrics",
        "Recruitment Analytics Dashboard",
        "REST API Access & Integrations",
        "White-label Portals",
        "Dedicated Account Manager",
        "99.9% SLA Uptime Guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
      link: paths.register,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#070D19]/40 border-y border-slate-800/40 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

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
            Pricing Plans
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
          >
            Flexible Plans for Any Career Stage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            Get full access to automated evaluations. Choose the size that fits your speed.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-[24px] p-8 flex flex-col justify-between overflow-hidden shadow-xl ${
                plan.popular
                  ? "bg-[#0F172A]/80 border-2 border-indigo-500/80 scale-[1.03] z-10"
                  : "bg-slate-900/30 border border-slate-800/80"
              }`}
            >
              {/* Highlight Glow for Popular Card */}
              {plan.popular && (
                <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-indigo-500/20 blur-[50px] pointer-events-none rounded-full" />
              )}

              {/* Badge for Popular Card */}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-[10px] font-bold tracking-widest text-white uppercase px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-[200px]">{plan.description}</p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 text-white border-b border-slate-800/60 pb-6">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm font-semibold text-slate-400">/{plan.period}</span>
                  )}
                </div>

                {/* Plan Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300 leading-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-slate-800/40">
                <Link
                  to={plan.link}
                  className={`block text-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:opacity-95 hover:scale-[1.02]"
                      : "bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 hover:scale-[1.02]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
