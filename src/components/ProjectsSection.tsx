import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, ProjectCategory } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { AnimatedHeading } from './common/AnimatedHeading';
import { defaultSectionConfigs } from '../data/initialData';
import {
  FolderGit2,
  ExternalLink,
  Github,
  ArrowRight,
  Sparkles,
  Sliders,
  Plus,
  Layers,
  ChevronRight
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, selectedProject, setSelectedProject, setIsCMSOpen, setCmsTab } = usePortfolio();
  const { projects } = data;
  const cfg = data.sectionConfigs?.projects || defaultSectionConfigs.projects;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (cfg.enabled === false) return null;

  const categories: string[] = ['All', 'Full-Stack', 'WordPress', 'AI Automation', 'Backend API'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative bg-[#090D1F] border-t border-indigo-950/70">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF7A29]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A3A] border border-indigo-800/50 text-xs font-mono text-[#FF7A29] mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-[#FF7A29]" />
              <span>{cfg.badge || 'Production Portfolio'}</span>
            </div>
            <AnimatedHeading
              title={cfg.title || 'Featured '}
              accent={cfg.titleAccent || 'Software Projects'}
              suffix={cfg.titleSuffix}
              animationType={cfg.animationType || 'gradient-shimmer'}
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

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-indigo-950/80" id="projects-category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white shadow-md shadow-[#FF7A29]/25 scale-105'
                  : 'bg-[#0E132D] text-slate-300 hover:text-white hover:bg-indigo-950/80 border border-indigo-900/40'
              }`}
            >
              {cat}
              {cat === 'All' && ` (${projects.length})`}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" id="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#0C1129] border border-indigo-900/40 hover:border-indigo-600/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-950/50 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
              id={`project-card-${project.id}`}
            >
              <div>
                {/* Image Cover */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1129] via-transparent to-transparent opacity-80" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-[#090D1A]/90 backdrop-blur-md border border-indigo-700/50 text-[#FF7A29] font-mono text-[11px] font-bold">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-lg bg-[#FF7A29] text-white font-mono text-[10px] font-bold shadow">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Date Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-slate-300 font-mono text-[11px]">
                      {project.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF7A29] transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#131938] border border-indigo-950 text-indigo-300 font-mono text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-indigo-950 text-slate-400 font-mono text-[10px]">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 sm:p-6 sm:pt-0 border-t border-indigo-950/60 mt-4 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>View Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FF7A29]" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/50 text-slate-300 hover:text-white transition-colors"
                      title="View GitHub repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-[#FF7A29]/15 hover:bg-[#FF7A29] text-[#FF7A29] hover:text-white border border-[#FF7A29]/30 transition-colors"
                      title="Open Live Preview"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-[#0C1129] rounded-2xl border border-indigo-900/40 p-8">
            <Layers className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white">No projects found in this category</h4>
            <p className="text-xs text-slate-400 mt-1">Check back soon for new project releases.</p>
          </div>
        )}
      </div>

      {/* Selected Project Full Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
