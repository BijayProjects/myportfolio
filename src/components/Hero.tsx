import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ArrowRight,
  Camera,
  Code2,
  CheckCircle2,
  Mail,
  Linkedin,
  Phone,
  Layers,
  Cpu
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  // Typing Letter Animation
  const typingWords = [
    'Scalable Web Systems',
    'Django & PHP Backends',
    'Custom CMS & Portals',
    'AI-Powered Workflows',
    'High-Performance UI'
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = typingWords[currentWordIndex];

      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(85);

        if (currentText === fullWord) {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(45);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed, typingWords]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[320px] h-[320px] bg-[#FF7A29]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14193615_1px,transparent_1px),linear-gradient(to_bottom,#14193615_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Availability Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131938]/90 border border-indigo-500/30 text-xs text-indigo-200 shadow-md backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A29] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A29]" />
            </span>
            <span className="font-medium text-slate-200">{profile.availability}</span>
            <span className="text-indigo-400/50">|</span>
            <span className="text-slate-400 font-mono text-[11px]">{profile.yearsExperience} Experience</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline with Typing Letter Animation */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF7A29] font-bold bg-[#FF7A29]/10 px-2.5 py-1 rounded-md border border-[#FF7A29]/20">
                Software Engineer
              </span>
              <span className="text-slate-400 text-xs font-mono">Full-Stack Developer</span>
            </div>

            {/* Main Headline with Typing Letter Animation */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.18] mb-5 min-h-[140px] sm:min-h-[160px] lg:min-h-[175px]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">{profile.name}</span>.
              <br />
              Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A29] via-[#FF8C42] to-amber-300">
                {currentText}
              </span>
              <span className="inline-block w-1.5 h-8 sm:h-10 lg:h-12 ml-1 bg-[#FF7A29] animate-pulse align-middle" />
            </h1>

            {/* Concise Clean Bio */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 font-normal">
              {profile.bio}
            </p>

            {/* Quick Skills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
              {['Python (Django)', 'PHP', 'JavaScript (ES6+)', 'Tailwind CSS', 'WordPress Custom', 'AI Prompt Eng.'].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#111736] border border-indigo-900/60 text-slate-300 font-mono text-xs font-medium hover:border-[#FF7A29]/50 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-8">
              <button
                id="hero-explore-projects-btn"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] hover:from-[#ff6b10] hover:to-[#eb4f00] text-white font-bold text-sm shadow-xl shadow-[#FF7A29]/25 hover:shadow-[#FF7A29]/40 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-open-gallery-btn"
                onClick={() => scrollTo('gallery')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#121938] hover:bg-[#18214a] text-slate-200 hover:text-white border border-indigo-700/40 text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer hover:border-indigo-500/60"
              >
                <Camera className="w-4 h-4 text-[#FF7A29]" />
                <span>View Gallery</span>
              </button>
            </div>

            {/* Quick Contact & Socials Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-4 border-t border-indigo-950/80">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 text-slate-300 hover:text-[#FF7A29] transition-colors"
                id="hero-email-link"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF7A29]" />
                <span>{profile.email}</span>
              </a>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-1.5 text-slate-300 hover:text-[#FF7A29] transition-colors"
                id="hero-phone-link"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>{profile.phone}</span>
              </a>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-[#FF7A29] transition-colors"
                id="hero-linkedin-link"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Code Terminal */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7A29]/30 via-indigo-600/30 to-purple-600/30 rounded-2xl blur-lg opacity-70" />

              {/* Terminal Card */}
              <div className="relative rounded-2xl bg-[#0B0F24] border border-indigo-800/50 shadow-2xl overflow-hidden" id="hero-terminal-card">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#080B1C] border-b border-indigo-950">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-xs font-mono text-slate-400 ml-2">bijaya-stack.ts</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
                    <Code2 className="w-3 h-3 text-[#FF7A29]" />
                    <span>Production</span>
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-5 font-mono text-xs space-y-3 leading-relaxed">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-[#FF7A29]">$</span>
                    <span className="text-slate-200 font-semibold">whoami</span>
                  </div>

                  <div className="pl-4 text-slate-300 border-l-2 border-indigo-900/60 space-y-1">
                    <p><span className="text-indigo-400">name:</span> "{profile.name}"</p>
                    <p><span className="text-indigo-400">role:</span> "Software Developer"</p>
                    <p><span className="text-indigo-400">focus:</span> ["Full-Stack", "Django", "PHP", "WordPress", "AI Prompting"]</p>
                    <p><span className="text-indigo-400">status:</span> <span className="text-emerald-400">"Available for Projects"</span></p>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 pt-1">
                    <span className="text-[#FF7A29]">$</span>
                    <span className="text-slate-200 font-semibold">check-core-proficiencies</span>
                  </div>

                  <div className="bg-[#070A18] p-3 rounded-xl border border-indigo-950/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Backend Architecture & APIs
                      </span>
                      <span className="text-[#FF7A29] font-bold">Django / PHP</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Custom WordPress Themes
                      </span>
                      <span className="text-[#FF7A29] font-bold">Full CMS</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        AI Workflows & Prompting
                      </span>
                      <span className="text-[#FF7A29] font-bold">Automated</span>
                    </div>
                  </div>

                  {/* Terminal Status */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      All systems operational
                    </span>
                    <span className="text-indigo-400 font-mono text-[10px]">v2.4</span>
                  </div>
                </div>
              </div>

              {/* Float Badge 1: Experience */}
              <div className="absolute -bottom-5 -left-4 bg-[#101736] border border-indigo-700/60 rounded-xl p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF7A29]/15 flex items-center justify-center text-[#FF7A29]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-tight">2+ Years</div>
                  <div className="text-[10px] text-slate-400 font-mono">Hands-on Experience</div>
                </div>
              </div>

              {/* Float Badge 2: Full-Stack */}
              <div className="absolute -top-4 -right-3 bg-[#101736] border border-indigo-700/60 rounded-xl p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Full-Stack & AI</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Production Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Highlights Ribbon */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4" id="hero-metrics-ribbon">
          {[
            { label: 'Hands-on Experience', value: '2+ Years', detail: 'Django, PHP & JavaScript' },
            { label: 'Core Frameworks', value: 'Full-Stack', detail: 'Python, WordPress & Tailwind' },
            { label: 'AI Optimization', value: 'Automated', detail: 'Prompt Engineering & Tools' },
            { label: 'Development Mindset', value: 'Agile & Clean', detail: 'Fast delivery & scalability' },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0D122B]/80 border border-indigo-900/40 backdrop-blur-sm hover:border-indigo-700/60 transition-all text-center sm:text-left"
            >
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-[#FF7A29] mt-0.5">{metric.label}</div>
              <div className="text-[11px] text-slate-400 mt-1">{metric.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
