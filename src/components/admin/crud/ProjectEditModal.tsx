import React, { useState } from 'react';
import { Project, ProjectCategory } from '../../../types';
import { ImageUploadField } from '../../common/ImageUploadField';
import {
  X,
  Save,
  Plus,
  Trash2,
  FolderGit2,
  Sparkles,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Star
} from 'lucide-react';

interface ProjectEditModalProps {
  project: Project | null; // null means creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Project, 'id'>) => void;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(project?.title || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [category, setCategory] = useState<ProjectCategory>(
    project?.category || 'Full-Stack'
  );
  const [summary, setSummary] = useState(project?.summary || '');
  const [fullDescription, setFullDescription] = useState(
    project?.fullDescription || ''
  );
  const [coverImage, setCoverImage] = useState(
    project?.coverImage ||
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  );
  const [techStackText, setTechStackText] = useState(
    project?.techStack?.join(', ') || 'React, TypeScript, Tailwind CSS, Node.js'
  );
  const [featuresText, setFeaturesText] = useState(
    project?.features?.join('\n') ||
      'Scalable Server Architecture\nHigh-Throughput API Endpoints\nResponsive Mobile-First UI\nZero-Downtime Deployment Workflow'
  );
  const [resultsOrMetrics, setResultsOrMetrics] = useState(
    project?.resultsOrMetrics || '99.98% uptime, <120ms response time'
  );
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl || '');
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '');
  const [client, setClient] = useState(project?.client || 'Enterprise Client');
  const [duration, setDuration] = useState(project?.duration || '3 Months');
  const [featured, setFeatured] = useState<boolean>(project?.featured ?? true);
  const [date, setDate] = useState(project?.date || '2026');

  const [screenshots, setScreenshots] = useState<string[]>(
    project?.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [coverImage]
  );
  const [activeTab, setActiveTab] = useState<'details' | 'media' | 'specs'>('details');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalTechStack = techStackText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const finalFeatures = featuresText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      summary: summary.trim(),
      fullDescription: fullDescription.trim(),
      coverImage,
      screenshots: screenshots.length > 0 ? screenshots : [coverImage],
      techStack: finalTechStack,
      features: finalFeatures,
      resultsOrMetrics: resultsOrMetrics.trim(),
      liveUrl: liveUrl.trim(),
      githubUrl: githubUrl.trim(),
      client: client.trim(),
      duration: duration.trim(),
      featured,
      date: date.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#161922] border border-[#2A3144] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#1C212E] border-b border-[#2A3144] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3E60D5]/20 border border-[#3E60D5]/40 flex items-center justify-center text-[#60A5FA]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {project ? `Edit Project: ${project.title}` : 'Create New Project Showcase'}
              </h2>
              <p className="text-[11px] text-slate-400">
                CRUD management with multi-method image upload (URL, drag-and-drop, and browser file).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#252C3D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="px-5 pt-3 bg-[#161922] border-b border-[#252C3D] flex gap-2 shrink-0">
          {[
            { id: 'details', label: '1. General Info & Copy' },
            { id: 'media', label: '2. Cover & Images (Drag/Drop/URL)' },
            { id: 'specs', label: '3. Tech Stack, Metrics & Links' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#3E60D5] text-white font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Enterprise Web Application"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="WordPress">WordPress</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Backend API">Backend API</option>
                    <option value="Frontend UI">Frontend UI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Card Short Summary <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Concise 1-2 sentence description displayed on the homepage cards"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Project Architecture & Overview
                </label>
                <textarea
                  rows={4}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="In-depth description of business problem, system architecture, database design, and outcomes..."
                  className="w-full p-3.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5] leading-relaxed resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client / Organization</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Fintech Global or Internal"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 4 Months, Ongoing"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Year / Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#10131A] rounded-xl border border-[#272D3D]">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#3E60D5] accent-[#3E60D5] cursor-pointer"
                />
                <label htmlFor="featured-toggle" className="text-xs text-slate-300 cursor-pointer flex items-center gap-1.5">
                  <Star className={`w-3.5 h-3.5 ${featured ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
                  <span>Feature this project prominently on top of the Portfolio</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-5">
              {/* Primary Cover Image with Multi-Method Uploader */}
              <ImageUploadField
                label="Primary Cover Banner Image"
                description="Upload via drag & drop, select from your local drive, paste a web URL, or choose a high-res preset."
                value={coverImage}
                onChange={(newUrl) => {
                  setCoverImage(newUrl);
                  if (screenshots.length === 0 || screenshots[0] === coverImage) {
                    setScreenshots([newUrl]);
                  }
                }}
                required
              />

              {/* Additional Screenshots */}
              <div className="pt-4 border-t border-[#272D3D] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white">Additional Showcase Screenshots</h3>
                    <p className="text-[11px] text-slate-400">
                      Include extra gallery screenshots for the project modal view.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setScreenshots([
                        ...screenshots,
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
                      ])
                    }
                    className="px-2.5 py-1 rounded-lg bg-[#272D3D] hover:bg-[#323B50] text-[#60A5FA] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Screenshot</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {screenshots.map((ss, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#10131A] border border-[#272D3D] space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono">Screenshot #{idx + 1}</span>
                        {screenshots.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setScreenshots(screenshots.filter((_, i) => i !== idx))}
                            className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                      <ImageUploadField
                        label=""
                        value={ss}
                        onChange={(newSs) => {
                          const updated = [...screenshots];
                          updated[idx] = newSs;
                          setScreenshots(updated);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Technologies / Tech Stack (comma separated) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={techStackText}
                  onChange={(e) => setTechStackText(e.target.value)}
                  placeholder="React, TypeScript, Tailwind CSS, PostgreSQL, Docker"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5]"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {techStackText
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#1C2232] text-[#60A5FA] text-[10px] font-mono border border-[#2E374D]"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Key Technical Features & Highlights (one per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Automated CI/CD deployment pipeline&#10;Sub-100ms Redis caching tier&#10;Role-based access control with JWT"
                  className="w-full p-3.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5] leading-relaxed resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Results / Metric Milestone
                </label>
                <input
                  type="text"
                  value={resultsOrMetrics}
                  onChange={(e) => setResultsOrMetrics(e.target.value)}
                  placeholder="e.g. 45% latency reduction, 100k+ MAU handled"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live Demonstration URL</span>
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://app.bijayatamang.dev"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-indigo-400" />
                    <span>GitHub Repository URL</span>
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/bijayatamang/system-arch"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#2A3144] flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#232838] hover:bg-[#2c3246] text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#3E60D5]/25 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{project ? 'Update Project' : 'Publish Project'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
