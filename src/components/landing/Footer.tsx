import { Compass, Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer id="footer" className="bg-[#070D19] border-t border-slate-800/80 relative z-10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-800/40">
        
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-6">
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-2.5 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-sm group-hover:rotate-12 transition-transform">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
              AI CareerPilot
            </span>
          </a>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Leverage advanced AI parsing, automated ATS scoring algorithms, and simulated video interviews to land your dream placement.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all hover:scale-105" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all hover:scale-105" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all hover:scale-105" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all hover:scale-105" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Home</a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleNavClick(e, "#features")} className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Features</a>
            </li>
            <li>
              <a href="#how-it-works" onClick={(e) => handleNavClick(e, "#how-it-works")} className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">How It Works</a>
            </li>
            <li>
              <a href="#pricing" onClick={(e) => handleNavClick(e, "#pricing")} className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Pricing</a>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
          <ul className="space-y-3">
            <li>
              <a href="#faq" onClick={(e) => handleNavClick(e, "#faq")} className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Help Center / FAQ</a>
            </li>
            <li>
              <a href="#home" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">API Reference docs</a>
            </li>
            <li>
              <a href="#home" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Security guidelines</a>
            </li>
            <li>
              <a href="#home" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">System Status</a>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
          <ul className="space-y-3">
            <li>
              <a href="#home" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">About Us</a>
            </li>
            <li>
              <a href="#home" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Careers at Pilot</a>
            </li>
            <li>
              <a href="#home" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#home" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Terms of Service</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; {currentYear} AI CareerPilot. All rights reserved.</p>
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
