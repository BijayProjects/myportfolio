import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Server,
  Layout,
  Globe,
  Cpu,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Zap,
  Target,
  Clock,
  ShieldCheck,
  MessageSquareCode,
  Sliders
} from 'lucide-react';

export const AboutSkills: React.FC = () => {
  const { data, setIsCMSOpen, setCmsTab } = usePortfolio();
  const { profile, skillCategories } = data;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-4 h-4 text-[#FF7A29]" />;
      case 'Layout': return <Layout className="w-4 h-4 text-indigo-400" />;
      case 'Globe': return <Globe className="w-4 h-4 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-purple-400" />;
      default: return <Sparkles className="w-4 h-4 text-[#FF7A29]" />;
    }
  };

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(c => c.id === activeCategory);

  return (
    <section id="about" className="py-20 relative bg-[#070A18]/60 border-t border-indigo-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A3A] border border-indigo-800/50 text-xs font-mono text-[#FF7A29] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A29]" />
            About & Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A29] to-amber-300">Scalability</span> & Reliability
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            With 2+ years of hands-on software development experience, I specialize in architecting backend systems, crafting pixel-perfect responsive frontends, and automating workflows.
          </p>
        </div>

        {/* Top Split: Professional Summary & Core Competencies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left: Professional Summary Card */}
          <div className="lg:col-span-7 bg-[#0C1129] border border-indigo-900/50 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF7A29]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A29] to-[#FA5D00] flex items-center justify-center text-white shadow-md shadow-[#FF7A29]/20">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Professional Summary</h3>
                  <p className="text-xs text-slate-400 font-mono">Bijaya Tamang • Software Developer</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p className="font-normal text-slate-200 bg-[#080B1C] p-4 rounded-xl border border-indigo-950/80">
                "{profile.professionalSummary}"
              </p>
              <p>
                I thrive at the intersection of robust backend engineering (Python Django, PHP APIs) and clean, responsive UI execution (Tailwind CSS, modern JavaScript). My focus is always on writing clean, maintainable code with strict attention to performance and real-world business value.
              </p>
            </div>

            {/* Education Highlight from PDF */}
            <div className="mt-6 pt-6 border-t border-indigo-950 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-300 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#FF7A29] font-bold uppercase tracking-wider">Education & Certification</div>
                <div className="text-sm font-bold text-white mt-0.5">{profile.education.degree} in {profile.education.field}</div>
                <div className="text-xs text-slate-400 mt-1">{profile.education.details}</div>
              </div>
            </div>
          </div>

          {/* Right: Core Competencies Grid */}
          <div className="lg:col-span-5 bg-[#0C1129] border border-indigo-900/50 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center text-indigo-300">
                  <Zap className="w-5 h-5 text-[#FF7A29]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Core Competencies</h3>
                  <p className="text-xs text-slate-400 font-mono">Verified Project Experience</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {profile.coreCompetencies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#080B1C] border border-indigo-950/80 hover:border-indigo-800/50 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#FF7A29]/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A29]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-200">{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Availability Footer */}
            <div className="mt-6 pt-4 border-t border-indigo-950 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Remote & Full-time Ready
              </span>
              <span className="font-mono text-indigo-300">Nepal (GMT+5:45)</span>
            </div>
          </div>
        </div>

        {/* Technical Skills Categorized Matrix */}
        <div className="bg-[#0C1129] border border-indigo-900/50 rounded-2xl p-6 sm:p-8 shadow-xl mb-16" id="skills-matrix-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Technical Skills & Stacks</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800/40 text-indigo-300 font-normal">
                  Production Level
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Languages, frontend tools, CMS platforms, and AI automation practices.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-[#080B1C] p-1 rounded-xl border border-indigo-950">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#FF7A29] text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Skills
              </button>
              {skillCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#FF7A29] text-white font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#080B1C] rounded-xl p-5 border border-indigo-950 hover:border-indigo-800/50 transition-all shadow-inner"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-950/80 border border-indigo-800/50">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{cat.title}</h4>
                    <p className="text-[11px] text-slate-400">{cat.description}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3.5">
                  {cat.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200 flex items-center gap-2">
                          {skill.name}
                          {skill.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-950 border border-indigo-800/50 text-indigo-300">
                              {skill.badge}
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-[11px] text-[#FF7A29] font-bold">{skill.level}%</span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-[#131938] h-2 rounded-full overflow-hidden p-0.5 border border-indigo-950">
                        <div
                          className="bg-gradient-to-r from-indigo-500 via-[#818CF8] to-[#FF7A29] h-full rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Strengths Grid from PDF */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Why Work With Me? Key Strengths</h3>
            <p className="text-xs text-slate-400 mt-1">Direct feedback and proven work habits on client deliverables</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {profile.keyStrengths.map((strength, idx) => {
              const icons = [ShieldCheck, Zap, Clock, Sparkles, MessageSquareCode];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0B0F26] border border-indigo-900/40 hover:border-[#FF7A29]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A29]/10 text-[#FF7A29] flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-medium text-slate-200 leading-snug">{strength}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-indigo-950/60 flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                    <span className="text-[#FF7A29]">0{idx + 1}</span>
                    <span>/ Verified Habit</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
