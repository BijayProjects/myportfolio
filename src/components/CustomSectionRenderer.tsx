import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CustomSectionPlacement, CustomSection } from '../types';
import { AnimatedHeading } from './common/AnimatedHeading';
import {
  Zap,
  Sparkles,
  Award,
  Star,
  CheckCircle2,
  ExternalLink,
  Layers,
  Server,
  Layout,
  Cpu,
  Bookmark,
  Sliders,
  Compass,
  ArrowRight
} from 'lucide-react';

interface CustomSectionRendererProps {
  placement: CustomSectionPlacement;
}

const getSectionIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Zap': return <Zap className="w-3.5 h-3.5 text-[#FF7A29]" />;
    case 'Award': return <Award className="w-3.5 h-3.5 text-amber-400" />;
    case 'Star': return <Star className="w-3.5 h-3.5 text-yellow-400" />;
    case 'Server': return <Server className="w-3.5 h-3.5 text-indigo-400" />;
    case 'Layout': return <Layout className="w-3.5 h-3.5 text-cyan-400" />;
    case 'Cpu': return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
    case 'Compass': return <Compass className="w-3.5 h-3.5 text-emerald-400" />;
    case 'Bookmark': return <Bookmark className="w-3.5 h-3.5 text-rose-400" />;
    case 'Sparkles':
    default:
      return <Sparkles className="w-3.5 h-3.5 text-[#FF7A29]" />;
  }
};

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({ placement }) => {
  const { data, setIsCMSOpen, setCmsTab, isAdminAuthenticated } = usePortfolio();
  const { customSections = [] } = data;

  const activeSections = customSections.filter(
    (sec) => sec.enabled && sec.placement === placement
  );

  if (activeSections.length === 0) return null;

  return (
    <>
      {activeSections.map((sec) => (
        <section
          key={sec.id}
          id={sec.slug || sec.id}
          className="py-20 relative bg-[#080B1C]/90 border-t border-indigo-950/70"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#FF7A29]/5 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A3A] border border-indigo-800/50 text-xs font-mono text-[#FF7A29] mb-3">
                  {getSectionIcon(sec.badgeIcon)}
                  <span>{sec.badge}</span>
                </div>

                <AnimatedHeading
                  title={sec.title}
                  accent={sec.titleAccent}
                  suffix={sec.titleSuffix}
                  animationType={sec.animationType}
                  accentGradient={sec.accentGradient}
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                />

                {sec.subtitle && (
                  <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                    {sec.subtitle}
                  </p>
                )}
              </div>

              {/* Admin Quick Edit Button */}
              {isAdminAuthenticated && (
                <button
                  onClick={() => {
                    setCmsTab('profile'); // Can jump to CMS
                    setIsCMSOpen(true);
                  }}
                  className="self-start sm:self-end inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#171D36] border border-indigo-900/60 hover:border-[#FF7A29]/50 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#FF7A29]" />
                  <span>Customize Section</span>
                </button>
              )}
            </div>

            {/* Custom Content Body */}
            {sec.content && (
              <div className="mb-10 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl bg-[#0E132D]/60 border border-indigo-950/80 p-5 sm:p-6 rounded-2xl">
                <p>{sec.content}</p>
              </div>
            )}

            {/* Custom Grid Items / Cards */}
            {sec.items && sec.items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sec.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#0C1129] border border-indigo-900/40 hover:border-[#FF7A29]/50 rounded-2xl p-6 shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#141A38] border border-indigo-800/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                          {getSectionIcon(item.icon || 'Sparkles')}
                        </div>
                        {item.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#182042] border border-indigo-800/50 text-[11px] font-mono text-indigo-300 font-medium">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF7A29] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.linkUrl && (
                      <div className="mt-5 pt-4 border-t border-indigo-950/70">
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF7A29] hover:text-[#ff9147] transition-colors"
                        >
                          <span>{item.linkLabel || 'Learn more'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
};
