import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SkillCategory, SkillItem } from '../../../types';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Save,
  Server,
  Layout,
  Globe,
  Cpu,
  Zap,
  Target,
  Sliders,
  AlertCircle
} from 'lucide-react';

export const SkillsCRUDSection: React.FC<{
  onShowToast: (msg: string) => void;
}> = ({ onShowToast }) => {
  const {
    data,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    addSkillToCategory,
    updateSkillInCategory,
    deleteSkillFromCategory,
    updateProfile
  } = usePortfolio();

  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);

  // New Category Form state
  const [catTitle, setCatTitle] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catIcon, setCatIcon] = useState('Server');

  // Skill editing state
  const [skillModalCategory, setSkillModalCategory] = useState<SkillCategory | null>(null);
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null); // null = new
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState<number>(90);
  const [skillBadge, setSkillBadge] = useState('');
  const [skillGroup, setSkillGroup] = useState<'languages' | 'frontend' | 'cms' | 'tools'>('languages');

  // Strengths & Competencies quick add
  const [newStrength, setNewStrength] = useState('');
  const [newCompetency, setNewCompetency] = useState('');

  const openSkillModal = (cat: SkillCategory, index: number | null = null) => {
    setSkillModalCategory(cat);
    setEditingSkillIndex(index);
    if (index !== null && cat.skills[index]) {
      const s = cat.skills[index];
      setSkillName(s.name);
      setSkillLevel(s.level);
      setSkillBadge(s.badge || '');
      setSkillGroup(s.category);
    } else {
      setSkillName('');
      setSkillLevel(90);
      setSkillBadge('Core');
      setSkillGroup(
        cat.id.includes('frontend')
          ? 'frontend'
          : cat.id.includes('cms')
          ? 'cms'
          : cat.id.includes('tool')
          ? 'tools'
          : 'languages'
      );
    }
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillModalCategory || !skillName.trim()) return;

    const skillItem: SkillItem = {
      name: skillName.trim(),
      category: skillGroup,
      level: Math.min(100, Math.max(1, Number(skillLevel))),
      badge: skillBadge.trim() || undefined
    };

    if (editingSkillIndex !== null) {
      updateSkillInCategory(skillModalCategory.id, editingSkillIndex, skillItem);
      onShowToast(`Updated skill "${skillItem.name}"!`);
    } else {
      addSkillToCategory(skillModalCategory.id, skillItem);
      onShowToast(`Added new skill "${skillItem.name}" to ${skillModalCategory.title}!`);
    }
    setSkillModalCategory(null);
    setEditingSkillIndex(null);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catTitle.trim()) return;

    if (editingCategory) {
      updateSkillCategory(editingCategory.id, {
        title: catTitle.trim(),
        description: catDesc.trim(),
        icon: catIcon
      });
      onShowToast(`Updated skill category "${catTitle}"!`);
      setEditingCategory(null);
    } else {
      addSkillCategory({
        title: catTitle.trim(),
        description: catDesc.trim(),
        icon: catIcon,
        skills: []
      });
      onShowToast(`Created new skill category "${catTitle}"!`);
      setIsNewCategoryOpen(false);
    }
    setCatTitle('');
    setCatDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Technical Skills & Arsenal ({data.skillCategories.length} Categories)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete CRUD management for skill categories, proficiencies, key strengths, and core competencies.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setCatTitle('');
            setCatDesc('');
            setCatIcon('Server');
            setIsNewCategoryOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#3E60D5]/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill Category</span>
        </button>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.skillCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#272D3D]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#252C3D] text-[#60A5FA]">
                      {cat.icon === 'Server' && <Server className="w-4 h-4" />}
                      {cat.icon === 'Layout' && <Layout className="w-4 h-4" />}
                      {cat.icon === 'Globe' && <Globe className="w-4 h-4" />}
                      {cat.icon === 'Cpu' && <Cpu className="w-4 h-4" />}
                    </span>
                    <h3 className="font-bold text-white text-sm">{cat.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{cat.description}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setEditingCategory(cat);
                      setCatTitle(cat.title);
                      setCatDesc(cat.description);
                      setCatIcon(cat.icon);
                      setIsNewCategoryOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#252C3D]"
                    title="Edit Category Details"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete category "${cat.title}" and all its skills?`)) {
                        deleteSkillCategory(cat.id);
                        onShowToast('Category removed.');
                      }
                    }}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Skills List */}
              <div className="mt-4 space-y-3">
                {cat.skills && cat.skills.length > 0 ? (
                  cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-xl bg-[#161922] border border-[#272D3D] flex items-center justify-between gap-3 group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-semibold text-slate-200 flex items-center gap-2 truncate">
                            <span>{skill.name}</span>
                            {skill.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-[#272D3D] text-[#60A5FA] text-[10px] font-mono">
                                {skill.badge}
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-xs text-[#3E60D5] font-bold shrink-0">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-[#0D1017] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#3E60D5] to-[#60A5FA] h-full rounded-full transition-all"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 shrink-0">
                        <button
                          onClick={() => openSkillModal(cat, sIdx)}
                          className="p-1 rounded text-slate-400 hover:text-white"
                          title="Edit Skill"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            deleteSkillFromCategory(cat.id, sIdx);
                            onShowToast(`Deleted "${skill.name}"`);
                          }}
                          className="p-1 rounded text-red-400 hover:text-red-300"
                          title="Delete Skill"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic py-2">No skills added in this category yet.</p>
                )}
              </div>
            </div>

            {/* Add Skill Button */}
            <div className="pt-4 mt-4 border-t border-[#272D3D]">
              <button
                onClick={() => openSkillModal(cat, null)}
                className="w-full py-2 rounded-xl bg-[#232838] hover:bg-[#2c3246] text-[#60A5FA] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill to {cat.title.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section: Key Strengths & Core Competencies CRUD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        {/* Strengths Card */}
        <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#272D3D]">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">Key Strengths ({data.profile.keyStrengths?.length || 0})</h3>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add key strength..."
              value={newStrength}
              onChange={(e) => setNewStrength(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-[#161922] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
            />
            <button
              onClick={() => {
                if (!newStrength.trim()) return;
                const updated = [...(data.profile.keyStrengths || []), newStrength.trim()];
                updateProfile({ keyStrengths: updated });
                setNewStrength('');
                onShowToast('Added key strength!');
              }}
              className="px-3 py-2 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {(data.profile.keyStrengths || []).map((str, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#161922] border border-[#272D3D] text-xs text-slate-200"
              >
                <span>{str}</span>
                <button
                  onClick={() => {
                    const updated = data.profile.keyStrengths.filter((_, i) => i !== idx);
                    updateProfile({ keyStrengths: updated });
                    onShowToast('Removed strength.');
                  }}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Competencies Card */}
        <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#272D3D]">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF7A29]" />
              <h3 className="font-bold text-white text-sm">
                Core Competencies ({data.profile.coreCompetencies?.length || 0})
              </h3>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add core competency..."
              value={newCompetency}
              onChange={(e) => setNewCompetency(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-[#161922] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
            />
            <button
              onClick={() => {
                if (!newCompetency.trim()) return;
                const updated = [...(data.profile.coreCompetencies || []), newCompetency.trim()];
                updateProfile({ coreCompetencies: updated });
                setNewCompetency('');
                onShowToast('Added competency!');
              }}
              className="px-3 py-2 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {(data.profile.coreCompetencies || []).map((comp, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#161922] border border-[#272D3D] text-xs text-slate-200"
              >
                <span>{comp}</span>
                <button
                  onClick={() => {
                    const updated = data.profile.coreCompetencies.filter((_, i) => i !== idx);
                    updateProfile({ coreCompetencies: updated });
                    onShowToast('Removed competency.');
                  }}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Category Create/Edit */}
      {isNewCategoryOpen && (
        <div className="fixed inset-0 z-[85] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161922] border border-[#2A3144] rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A3144]">
              <h3 className="font-bold text-white text-sm">
                {editingCategory ? 'Edit Skill Category' : 'Create New Skill Category'}
              </h3>
              <button
                onClick={() => setIsNewCategoryOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category Title *</label>
                <input
                  type="text"
                  required
                  value={catTitle}
                  onChange={(e) => setCatTitle(e.target.value)}
                  placeholder="e.g. Cloud & DevOps Infrastructure"
                  className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <input
                  type="text"
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="e.g. Serverless architectures and CI/CD pipelines."
                  className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Icon Representation</label>
                <select
                  value={catIcon}
                  onChange={(e) => setCatIcon(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                >
                  <option value="Server">Server (Backend)</option>
                  <option value="Layout">Layout (Frontend UI)</option>
                  <option value="Globe">Globe (CMS / WordPress)</option>
                  <option value="Cpu">Cpu (AI / Tools / DevOps)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#2A3144] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewCategoryOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#232838] text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Skill Create/Edit */}
      {skillModalCategory && (
        <div className="fixed inset-0 z-[85] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161922] border border-[#2A3144] rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A3144]">
              <div>
                <h3 className="font-bold text-white text-sm">
                  {editingSkillIndex !== null ? 'Edit Skill Item' : 'Add Skill Item'}
                </h3>
                <p className="text-[11px] text-slate-400">Target: {skillModalCategory.title}</p>
              </div>
              <button
                onClick={() => setSkillModalCategory(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g. Python (Django), Docker, React"
                  className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Proficiency Level</label>
                  <span className="text-xs font-mono text-[#60A5FA] font-bold">{skillLevel}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(Number(e.target.value))}
                  className="w-full accent-[#3E60D5] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Specialty Badge / Tag</label>
                <input
                  type="text"
                  value={skillBadge}
                  onChange={(e) => setSkillBadge(e.target.value)}
                  placeholder="e.g. Specialist, Core Server, Lead"
                  className="w-full px-3 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                />
              </div>

              <div className="pt-3 border-t border-[#2A3144] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSkillModalCategory(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#232838] text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
