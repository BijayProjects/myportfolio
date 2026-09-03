import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AnimatedHeading } from './common/AnimatedHeading';
import { defaultSectionConfigs } from '../data/initialData';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sliders,
  Sparkles,
  Layers,
  Building2,
  ChevronRight
} from 'lucide-react';

export const WorkTimeline: React.FC = () => {
  const { data, setIsCMSOpen, setCmsTab } = usePortfolio();
  const { workEntries } = data;
  const cfg = data.sectionConfigs?.work || defaultSectionConfigs.work;

  if (cfg.enabled === false) return null;

  return (
    <section id="work" className="py-20 relative bg-[#070A18]/80 border-t border-indigo-950/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A3A] border border-indigo-800/50 text-xs font-mono text-[#FF7A29] mb-3">
              <Briefcase className="w-3.5 h-3.5 text-[#FF7A29]" />
              <span>{cfg.badge || 'Career & Work Entries'}</span>
            </div>
            <AnimatedHeading
              title={cfg.title || 'Work History & '}
              accent={cfg.titleAccent || 'Deliverables'}
              suffix={cfg.titleSuffix}
              animationType={cfg.animationType || 'fade-rotate'}
              accentGradient={cfg.accentGradient || 'orange-amber'}
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            />
            {cfg.subtitle && (
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
                {cfg.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative space-y-12">
          {/* Continuous Timeline Spine - mathematically aligned to node center */}
          <div
            aria-hidden="true"
            className="absolute left-2.5 top-3.5 bottom-3.5 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#FF7A29] via-indigo-500 to-indigo-950 pointer-events-none"
          />

          {workEntries.map((entry, index) => (
            <div
              key={entry.id}
              className="relative flex items-start gap-4 sm:gap-6 group"
              id={`work-entry-${entry.id}`}
            >
              {/* Circuit Node on timeline matching brand logo - dead-center on the vertical spine */}
              <div className="relative flex-shrink-0 w-5 flex justify-center pt-2 z-10">
                <div className="w-5 h-5 rounded-full bg-[#090D1A] border-2 border-[#FF7A29] flex items-center justify-center shadow-lg shadow-[#FF7A29]/30 group-hover:scale-125 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-[#FF7A29]" />
                </div>
              </div>

              {/* Work Card */}
              <div className="flex-1 min-w-0 bg-[#0C1129] border border-indigo-900/50 hover:border-indigo-700/70 rounded-2xl p-6 sm:p-7 shadow-xl transition-all">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-mono text-[#FF7A29] font-bold uppercase tracking-wider">
                      {entry.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      {entry.role}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-300 text-sm font-medium mt-0.5">
                      <Building2 className="w-4 h-4 text-indigo-400" />
                      <span>{entry.organization}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#080C1E] border border-indigo-950 text-indigo-300">
                      <Calendar className="w-3.5 h-3.5 text-[#FF7A29]" />
                      <span>{entry.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{entry.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {entry.description}
                </p>

                {/* Key Highlights / Achievements */}
                {entry.highlights && entry.highlights.length > 0 && (
                  <div className="space-y-2 mb-5">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      Key Deliverables & Milestones:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {entry.highlights.map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-[#080C1E] border border-indigo-950/80 text-xs text-slate-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A29] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Footer */}
                <div className="pt-4 border-t border-indigo-950 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">Stack:</span>
                  {entry.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-indigo-950/90 border border-indigo-800/40 text-indigo-300 font-mono text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
