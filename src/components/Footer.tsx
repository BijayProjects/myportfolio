import React from 'react';
import { Logo } from './Logo';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Heart,
  Sliders,
  ArrowUp,
  Mail,
  Phone,
  Linkedin,
  Github,
  CheckCircle2,
  Code2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsCMSOpen, setCmsTab } = usePortfolio();
  const { profile } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060814] border-t border-indigo-950/90 text-slate-400 text-xs py-12 relative z-10" id="main-portfolio-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-indigo-950/80">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" showSubtitle={true} />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Full-Stack Software Developer delivering scalable backend systems, custom WordPress themes, responsive web applications, and AI automated pipelines.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profile.availability}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">Quick Navigation</div>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#about" className="hover:text-[#FF7A29] transition-colors">About & Core Competencies</a></li>
              <li><a href="#projects" className="hover:text-[#FF7A29] transition-colors">Featured Projects</a></li>
              <li><a href="#work" className="hover:text-[#FF7A29] transition-colors">Experience & Deliverables</a></li>
              <li><a href="#gallery" className="hover:text-[#FF7A29] transition-colors">High-Resolution Gallery</a></li>
              <li><a href="#blog" className="hover:text-[#FF7A29] transition-colors">Engineering Blog</a></li>
              <li><a href="#contact" className="hover:text-[#FF7A29] transition-colors">Contact Information</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">Direct Channels</div>
            <div className="space-y-1 text-slate-300 text-xs">
              <p>Email: <a href={`mailto:${profile.email}`} className="text-[#FF7A29] hover:underline font-mono">{profile.email}</a></p>
              <p>Phone: <a href={`tel:${profile.phone}`} className="text-indigo-300 hover:underline font-mono">{profile.phone}</a></p>
              <p>Location: Kathmandu, Nepal (Remote Worldwide)</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-indigo-950/60 hover:bg-blue-950/60 text-slate-300 hover:text-blue-400 border border-indigo-900/60 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-indigo-950/60 hover:bg-purple-950/60 text-slate-300 hover:text-purple-400 border border-indigo-900/60 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-indigo-950/60 hover:bg-[#FF7A29]/20 text-slate-300 hover:text-[#FF7A29] border border-indigo-900/60 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name}. All rights reserved. Designed with custom developer branding and high-performance React architecture.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 text-slate-300 hover:text-white border border-indigo-800/40 text-xs font-mono transition-colors cursor-pointer"
            id="footer-back-to-top-btn"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 text-[#FF7A29]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
