import React, { useState } from 'react';
import { Project } from '../types';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const images = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.coverImage];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn" id="project-detail-modal-backdrop">
      <div
        className="relative w-full max-w-4xl bg-[#0C1129] border border-indigo-800/60 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        id="project-detail-modal-card"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080C1E] border-b border-indigo-950 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#FF7A29]/15 text-[#FF7A29] font-mono text-xs font-bold border border-[#FF7A29]/30">
              {project.category}
            </span>
            <span className="text-slate-400 text-xs font-mono hidden sm:inline">•</span>
            <span className="text-slate-300 text-xs font-mono hidden sm:inline">{project.date}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Title & Summary */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2 text-slate-300 text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Screenshot Carousel / Showcase */}
          <div className="relative rounded-xl overflow-hidden border border-indigo-900/60 bg-black aspect-video max-h-[420px] group">
            <img
              src={images[activeImageIndex]}
              alt={`${project.title} preview ${activeImageIndex + 1}`}
              className="w-full h-full object-cover object-top transition-all duration-300"
              referrerPolicy="no-referrer"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Thumbnails indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeImageIndex === idx ? 'bg-[#FF7A29] w-5' : 'bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Action Links & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#080C1E] border border-indigo-950">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-mono">
              {project.client && (
                <div>
                  <span className="text-indigo-400">Client:</span> {project.client}
                </div>
              )}
              {project.duration && (
                <div>
                  <span className="text-indigo-400">Duration:</span> {project.duration}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF7A29] hover:bg-[#ff6912] text-white text-xs font-bold transition-all shadow-md shadow-[#FF7A29]/25"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-800/60 text-slate-200 text-xs font-semibold transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FF7A29]" />
              <span>Project Architecture & Solution</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>

          {/* Features Implemented */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono text-indigo-400 uppercase tracking-wider font-bold">
                Key Technical Features & Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#080C1E] border border-indigo-950 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FF7A29] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results / Performance Metrics */}
          {project.resultsOrMetrics && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  Measurable Impact & Performance Result
                </div>
                <div className="text-sm font-semibold text-emerald-100 mt-0.5">
                  {project.resultsOrMetrics}
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Technologies Employed</div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-800/50 text-indigo-200 font-mono text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080C1E] border-t border-indigo-950 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
