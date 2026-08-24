import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  Hero,
  TrustedTech,
  Features,
  HowItWorks,
  WhyChooseUs,
  Statistics,
  Testimonials,
  Pricing,
  FAQ,
  CTA,
  Footer,
} from "@/components/landing";

export function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Show/Hide Back to Top Button
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 selection:bg-indigo-500/30 selection:text-white overflow-hidden relative">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-800 z-[60]">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Global Background Grid/Dots Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none z-0" />

      {/* Primary Sticky Navbar */}
      <Navbar />

      {/* Landing Page Content Sections */}
      <main className="relative z-10">
        <Hero />
        <TrustedTech />
        <Features />
        <HowItWorks />
        <WhyChooseUs />
        <Statistics />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full border border-slate-800 bg-[#0B1120]/80 backdrop-blur-md text-slate-300 hover:text-white shadow-xl hover:border-slate-700 hover:shadow-indigo-500/10 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
export default LandingPage;
