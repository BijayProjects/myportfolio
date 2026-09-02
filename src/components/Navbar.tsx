import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Menu,
  X,
  Sliders,
  Mail,
  FileCode,
  FolderGit2,
  Sparkles,
  Camera,
  BookOpen,
  Briefcase,
  User,
  Sun,
  Moon,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, setIsCMSOpen, theme, toggleTheme } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const unreadMessagesCount = (data.messages || []).filter(m => m.status === 'unread').length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      
      const sections = ['hero', 'about', 'projects', 'work', 'gallery', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About & Skills', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'work', label: 'Experience', icon: Briefcase },
    { id: 'gallery', label: 'High-Res Gallery', icon: Camera },
    { id: 'blog', label: 'Articles', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090D1A]/90 backdrop-blur-md border-b border-indigo-950/80 shadow-lg shadow-black/40 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            id="nav-brand-logo-link"
          >
            <Logo size="md" showSubtitle={true} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#10162F]/70 border border-indigo-900/40 rounded-full px-3 py-1.5 backdrop-blur-sm shadow-inner shadow-black/20" id="desktop-nav-links">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF7A29] to-[#FF5500] text-white shadow-md shadow-[#FF7A29]/25'
                      : 'text-slate-300 hover:text-white hover:bg-indigo-950/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5" id="nav-actions-container">
            {/* Quick Contact / Hire Button */}
            <button
              id="nav-hire-me-btn"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF7A29] hover:bg-[#ff6912] text-white text-xs font-bold transition-all duration-200 shadow-md shadow-[#FF7A29]/20 hover:shadow-lg hover:shadow-[#FF7A29]/35 cursor-pointer active:scale-95"
            >
              <span>Get In Touch</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-indigo-950/70 border border-indigo-800/50 text-slate-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c1226]/98 border-b border-indigo-900/60 backdrop-blur-xl px-4 pt-3 pb-5 shadow-2xl transition-all" id="mobile-nav-menu">
            <div className="flex flex-col gap-1.5 mb-4">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#FF7A29] text-white font-semibold'
                        : 'text-slate-300 hover:bg-indigo-950/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-indigo-900/40 flex flex-col gap-2">
              <button
                id="mobile-contact-cta-btn"
                onClick={() => scrollToSection('contact')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FF7A29] text-white font-bold text-xs shadow-md shadow-[#FF7A29]/20"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Bijaya Tamang</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
