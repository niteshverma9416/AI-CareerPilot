import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { paths } from "@/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#footer" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#0B1120]/80 border-b border-slate-800/80 backdrop-blur-md shadow-lg shadow-black/20"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300 group-hover:rotate-12">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              AI CareerPilot
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-right from-indigo-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to={paths.login}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2 px-4"
            >
              Login
            </Link>
            <Link
              to={paths.register}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-xl group bg-gradient-to-br from-indigo-500 to-cyan-500 group-hover:from-indigo-500 group-hover:to-cyan-500 text-white hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-800 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] !mb-0 !mr-0"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#0B1120] rounded-[10px] group-hover:bg-opacity-0">
                Get Started
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-slate-300 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-[#0B1120]/95 backdrop-blur-lg border-b border-slate-800 lg:hidden shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-base font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-slate-800 my-2" />
              <div className="flex flex-col gap-3">
                <Link
                  to={paths.login}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-800 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to={paths.register}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
