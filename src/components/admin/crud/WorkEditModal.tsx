import React, { useState } from 'react';
import { WorkEntry } from '../../../types';
import {
  X,
  Save,
  Briefcase,
  Building,
  Calendar,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface WorkEditModalProps {
  entry: WorkEntry | null; // null means creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<WorkEntry, 'id'>) => void;
}

export const WorkEditModal: React.FC<WorkEditModalProps> = ({
  entry,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const [role, setRole] = useState(entry?.role || '');
  const [organization, setOrganization] = useState(entry?.organization || '');
  const [period, setPeriod] = useState(entry?.period || '2024 - Present');
  const [type, setType] = useState<WorkEntry['type']>(
    entry?.type || 'Full-time'
  );
  const [location, setLocation] = useState(entry?.location || 'Remote, Global');
  const [description, setDescription] = useState(
    entry?.description ||
      'Spearheading full-stack engineering, designing high-concurrency microservices, and leading frontend architectural refactors.'
  );
  const [highlightsText, setHighlightsText] = useState(
    entry?.highlights?.join('\n') ||
      'Engineered scalable microservices processing over 150k daily events\nReduced client frontend page load latency by 42% using modern build workflows\nAuthored reusable component libraries and CI/CD pipelines'
  );
  const [techStackText, setTechStackText] = useState(
    entry?.techStack?.join(', ') || 'React, TypeScript, Python Django, PostgreSQL, Docker'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !organization.trim()) return;

    const highlights = highlightsText
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const techStack = techStackText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      role: role.trim(),
      organization: organization.trim(),
      period: period.trim(),
      type,
      location: location.trim(),
      description: description.trim(),
      highlights,
      techStack
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#161922] border border-[#2A3144] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#1C212E] border-b border-[#2A3144] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3E60D5]/20 border border-[#3E60D5]/40 flex items-center justify-center text-[#60A5FA]">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {entry ? `Edit Career Entry: ${entry.role}` : 'Add New Career & Work Timeline Entry'}
              </h2>
              <p className="text-[11px] text-slate-400">
                CRUD role configuration for the professional timeline.
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

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Job Title / Role <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Company / Organization <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Tech Studio Labs"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Timeline Period</label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. 2024 - Present"
                className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Employment Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
              >
                <option value="Full-time">Full-time</option>
                <option value="Freelance / Contract">Freelance / Contract</option>
                <option value="Project Engagement">Project Engagement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Remote, Kathmandu"
                className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Role Responsibilities & Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-level overview of day-to-day impact and core contributions..."
              className="w-full p-3 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5] leading-relaxed resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Key Achievements & Milestones (one per line)
            </label>
            <textarea
              rows={4}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="Led zero-downtime database migration&#10;Increased mobile throughput by 35%&#10;Mentored 4 junior engineers"
              className="w-full p-3 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5] leading-relaxed resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Technologies Utilized (comma separated)
            </label>
            <input
              type="text"
              value={techStackText}
              onChange={(e) => setTechStackText(e.target.value)}
              placeholder="React, Django, Tailwind CSS, PostgreSQL, Docker"
              className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5]"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#2A3144] flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#232838] hover:bg-[#2c3246] text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#3E60D5]/25 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{entry ? 'Update Role' : 'Add to Career Timeline'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
