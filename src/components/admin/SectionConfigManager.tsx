import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  SectionContentConfig,
  HeroAnimationConfig,
  CustomSection,
  HeadingAnimationType,
  AccentGradientTheme,
  CustomSectionPlacement
} from '../../types';
import { AnimatedHeading } from '../common/AnimatedHeading';
import {
  defaultSectionConfigs,
  defaultHeroAnimation
} from '../../data/initialData';
import {
  Sliders,
  Sparkles,
  Zap,
  Plus,
  Trash2,
  Edit3,
  Check,
  Eye,
  EyeOff,
  Layers,
  Palette,
  RotateCcw,
  Type,
  Layout,
  Save,
  ArrowRight,
  HelpCircle,
  FolderGit2,
  Briefcase,
  Camera,
  BookOpen,
  Mail,
  MoveUp,
  MoveDown,
  X
} from 'lucide-react';

const ANIMATION_TYPES: { id: HeadingAnimationType; label: string; desc: string }[] = [
  { id: 'gradient-shimmer', label: 'Gradient Shimmer', desc: 'Radiant pulsing gradient with ambient glow' },
  { id: 'typewriter', label: 'Typewriter Effect', desc: 'Letter-by-letter typing with layout-stable pulsing cursor' },
  { id: 'fade-rotate', label: 'Fade & Slide Up', desc: 'Smooth vertical entrance transition' },
  { id: 'wave-bounce', label: 'Wave Letter Bounce', desc: 'Rhythmic cascading bounce across characters' },
  { id: 'glitch-tech', label: 'Cyber Tech Glitch', desc: 'Subtle holographic futuristic digital displacement' },
  { id: 'glow-pulse', label: 'Ambient Neon Glow', desc: 'Deep breathing glow around the highlighted text' }
];

const GRADIENT_THEMES: { id: AccentGradientTheme; label: string; preview: string }[] = [
  { id: 'orange-amber', label: 'Signature Orange / Amber', preview: 'from-[#FF7A29] via-[#FFA15C] to-amber-300' },
  { id: 'indigo-blue', label: 'Electric Indigo / Blue', preview: 'from-indigo-400 via-sky-400 to-cyan-300' },
  { id: 'emerald-teal', label: 'Emerald / Mint Teal', preview: 'from-emerald-400 via-teal-300 to-cyan-300' },
  { id: 'rose-pink', label: 'Rose / Sunset Pink', preview: 'from-rose-400 via-pink-400 to-amber-300' },
  { id: 'purple-violet', label: 'Cosmic Purple / Violet', preview: 'from-purple-400 via-violet-300 to-indigo-300' }
];

const PLACEMENT_OPTIONS: { id: CustomSectionPlacement; label: string }[] = [
  { id: 'after-hero', label: 'After Hero (Top)' },
  { id: 'after-about', label: 'After About & Skills' },
  { id: 'after-projects', label: 'After Projects' },
  { id: 'after-work', label: 'After Work Timeline' },
  { id: 'after-gallery', label: 'After Gallery' },
  { id: 'after-blog', label: 'After Blog' }
];

export const SectionConfigManager: React.FC = () => {
  const {
    data,
    updateSectionConfig,
    updateHeroAnimation,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'standard' | 'hero' | 'custom'>('standard');
  const [selectedSectionKey, setSelectedSectionKey] = useState<string>('projects');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Hero Animation Local Editing State
  const currentHeroAnim = data.heroAnimation || defaultHeroAnimation;
  const [newWordInput, setNewWordInput] = useState('');

  // Custom Section Modal / Editing State
  const [isCustomSectionModalOpen, setIsCustomSectionModalOpen] = useState(false);
  const [editingCustomSection, setEditingCustomSection] = useState<CustomSection | null>(null);
  const [customForm, setCustomForm] = useState<Partial<CustomSection>>({
    title: '',
    titleAccent: '',
    titleSuffix: '',
    badge: 'Specialized Offering',
    badgeIcon: 'Zap',
    subtitle: '',
    content: '',
    placement: 'after-projects',
    animationType: 'gradient-shimmer',
    accentGradient: 'orange-amber',
    enabled: true,
    items: []
  });

  // Item inside custom section
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemBadge, setNewItemBadge] = useState('');

  const showToast = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  // Section list definitions
  const sectionList = [
    { id: 'projects', label: 'Projects Section', icon: FolderGit2 },
    { id: 'about', label: 'About & Arsenal', icon: Sparkles },
    { id: 'work', label: 'Work Timeline', icon: Briefcase },
    { id: 'gallery', label: 'High-Res Gallery', icon: Camera },
    { id: 'blog', label: 'Blog & Articles', icon: BookOpen },
    { id: 'contact', label: 'Contact & Inquiries', icon: Mail }
  ];

  const currentSectionConfig: SectionContentConfig =
    data.sectionConfigs?.[selectedSectionKey] ||
    defaultSectionConfigs[selectedSectionKey] || {
      id: selectedSectionKey,
      badge: 'Section',
      title: '',
      titleAccent: '',
      subtitle: '',
      animationType: 'gradient-shimmer',
      accentGradient: 'orange-amber',
      enabled: true
    };

  // Handler for updating standard section field
  const handleSectionFieldChange = (field: keyof SectionContentConfig, value: any) => {
    updateSectionConfig(selectedSectionKey, { [field]: value });
  };

  // Open Add Custom Section
  const handleOpenAddCustomSection = () => {
    setEditingCustomSection(null);
    setCustomForm({
      title: 'Our Custom ',
      titleAccent: 'Solutions',
      titleSuffix: '',
      badge: 'Specialized Capabilities',
      badgeIcon: 'Sparkles',
      subtitle: 'Targeted offerings crafted with scalability and precision.',
      content: 'High-impact technical deliverables built to perform under demand.',
      placement: 'after-projects',
      animationType: 'gradient-shimmer',
      accentGradient: 'orange-amber',
      enabled: true,
      items: [
        {
          id: 'item-' + Date.now(),
          title: 'Custom Architecture',
          description: 'Bespoke full-stack systems tailored to your technical requirements.',
          badge: 'Feature'
        }
      ]
    });
    setIsCustomSectionModalOpen(true);
  };

  // Open Edit Custom Section
  const handleOpenEditCustomSection = (sec: CustomSection) => {
    setEditingCustomSection(sec);
    setCustomForm({ ...sec });
    setIsCustomSectionModalOpen(true);
  };

  // Save Custom Section
  const handleSaveCustomSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.titleAccent?.trim()) {
      alert('Please provide a highlighted title phrase for the section.');
      return;
    }

    if (editingCustomSection) {
      updateCustomSection(editingCustomSection.id, customForm);
      showToast(`Custom section updated successfully.`);
    } else {
      addCustomSection({
        slug: (customForm.titleAccent || 'section').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        badge: customForm.badge || 'Feature Section',
        badgeIcon: customForm.badgeIcon || 'Sparkles',
        title: customForm.title || '',
        titleAccent: customForm.titleAccent || '',
        titleSuffix: customForm.titleSuffix || '',
        subtitle: customForm.subtitle || '',
        content: customForm.content,
        items: customForm.items || [],
        animationType: customForm.animationType || 'gradient-shimmer',
        accentGradient: customForm.accentGradient || 'orange-amber',
        placement: customForm.placement || 'after-projects',
        enabled: customForm.enabled !== false
      });
      showToast(`New custom section created.`);
    }

    setIsCustomSectionModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {saveSuccessNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#17233B] border border-emerald-500/40 text-emerald-300 rounded-xl shadow-2xl animate-fade-in text-sm font-medium">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-[#1C2030] border border-[#2B3245] rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 text-[#FF7A29] text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4" />
              <span>Visual Heading & Dynamic Content Controls</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Section Content, Heading & Animation Editor
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Customize the headings, highlighted accents, animation effects, and badges for every section or create entirely new custom sections.
            </p>
          </div>

          {/* Navigation Pill Switcher */}
          <div className="flex items-center bg-[#141724] p-1 rounded-xl border border-[#2A3144] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'standard'
                  ? 'bg-[#FF7A29] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Standard Sections
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'hero'
                  ? 'bg-[#FF7A29] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hero Typing & Motion
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-[#FF7A29] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Custom Sections ({data.customSections?.length || 0})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: STANDARD SECTIONS CONFIG */}
      {activeTab === 'standard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Section Selector Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold px-1 mb-2">
              Select Section to Edit
            </div>
            {sectionList.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedSectionKey === item.id;
              const isEnabled = data.sectionConfigs?.[item.id]?.enabled !== false;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSectionKey(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#232A42] border-[#FF7A29]/50 text-white shadow-lg'
                      : 'bg-[#181D2C] border-[#252C40] text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#FF7A29]/20 text-[#FF7A29]' : 'bg-[#131724] text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-[11px] text-slate-400">
                        {data.sectionConfigs?.[item.id]?.animationType || 'gradient-shimmer'}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isEnabled ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`}>
                    {isEnabled ? 'Active' : 'Hidden'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Section Editor & Live Preview */}
          <div className="lg:col-span-8 space-y-6">
            {/* Live Visual Preview Box */}
            <div className="bg-[#0C1122] border border-indigo-950/90 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#141A38] border-b border-l border-indigo-800/40 rounded-bl-xl text-[10px] font-mono text-indigo-300 flex items-center gap-1.5">
                <Eye className="w-3 h-3 text-[#FF7A29]" />
                <span>Live Heading Preview</span>
              </div>

              <div className="mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#161C3D] border border-indigo-800/50 text-[11px] font-mono text-[#FF7A29]">
                  <Sparkles className="w-3 h-3" />
                  {currentSectionConfig.badge || 'Section Badge'}
                </span>
              </div>

              {/* Animated Heading Rendering */}
              <div className="my-3">
                <AnimatedHeading
                  title={currentSectionConfig.title || 'Section '}
                  accent={currentSectionConfig.titleAccent || 'Highlighted Text'}
                  suffix={currentSectionConfig.titleSuffix}
                  animationType={currentSectionConfig.animationType || 'gradient-shimmer'}
                  accentGradient={currentSectionConfig.accentGradient || 'orange-amber'}
                  className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                />
              </div>

              <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                {currentSectionConfig.subtitle || 'Section subtitle description will display here on the public website.'}
              </p>
            </div>

            {/* Editable Form Controls */}
            <div className="bg-[#1C2030] border border-[#2B3245] rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#282F42]">
                <div>
                  <h3 className="text-base font-bold text-white capitalize">
                    {selectedSectionKey} Section Configuration
                  </h3>
                  <p className="text-xs text-slate-400">
                    Edits apply instantly to your live portfolio view and persist across sessions.
                  </p>
                </div>

                {/* Section Enabled Toggle */}
                <label className="flex items-center gap-2 cursor-pointer bg-[#141826] px-3 py-1.5 rounded-xl border border-[#2A3144]">
                  <input
                    type="checkbox"
                    checked={currentSectionConfig.enabled !== false}
                    onChange={(e) => handleSectionFieldChange('enabled', e.target.checked)}
                    className="rounded border-[#3E4760] text-[#FF7A29] focus:ring-[#FF7A29]"
                  />
                  <span className="text-xs font-semibold text-slate-300">
                    {currentSectionConfig.enabled !== false ? 'Section Visible' : 'Section Hidden'}
                  </span>
                </label>
              </div>

              {/* Badge & Title Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Section Badge Tag
                  </label>
                  <input
                    type="text"
                    value={currentSectionConfig.badge || ''}
                    onChange={(e) => handleSectionFieldChange('badge', e.target.value)}
                    placeholder="e.g. Production Portfolio"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2E364A] text-white text-xs focus:border-[#FF7A29] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Title Prefix Text
                  </label>
                  <input
                    type="text"
                    value={currentSectionConfig.title || ''}
                    onChange={(e) => handleSectionFieldChange('title', e.target.value)}
                    placeholder="e.g. Featured "
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2E364A] text-white text-xs focus:border-[#FF7A29] outline-none"
                  />
                </div>
              </div>

              {/* Accented Highlight and Suffix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#FF7A29] font-bold mb-1.5">
                    Highlighted / Animated Accent Text *
                  </label>
                  <input
                    type="text"
                    value={currentSectionConfig.titleAccent || ''}
                    onChange={(e) => handleSectionFieldChange('titleAccent', e.target.value)}
                    placeholder="e.g. Software Projects"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#FF7A29]/50 text-white text-xs font-semibold focus:border-[#FF7A29] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Title Suffix (Optional)
                  </label>
                  <input
                    type="text"
                    value={currentSectionConfig.titleSuffix || ''}
                    onChange={(e) => handleSectionFieldChange('titleSuffix', e.target.value)}
                    placeholder="e.g. & Deliverables"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2E364A] text-white text-xs focus:border-[#FF7A29] outline-none"
                  />
                </div>
              </div>

              {/* Subtitle / Paragraph */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Section Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={currentSectionConfig.subtitle || ''}
                  onChange={(e) => handleSectionFieldChange('subtitle', e.target.value)}
                  placeholder="Provide an overview explaining this section..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2E364A] text-white text-xs focus:border-[#FF7A29] outline-none resize-none"
                />
              </div>

              {/* Heading Animation Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Heading Animation Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {ANIMATION_TYPES.map((anim) => (
                    <button
                      key={anim.id}
                      type="button"
                      onClick={() => handleSectionFieldChange('animationType', anim.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        currentSectionConfig.animationType === anim.id
                          ? 'bg-[#232A42] border-[#FF7A29] text-white shadow-md'
                          : 'bg-[#141724] border-[#2A3144] text-slate-400 hover:text-white hover:border-slate-500'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-0.5">{anim.label}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{anim.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Gradient Theme */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Accent Color Gradient
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {GRADIENT_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleSectionFieldChange('accentGradient', theme.id)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentSectionConfig.accentGradient === theme.id
                          ? 'bg-[#232A42] border-[#FF7A29] text-white'
                          : 'bg-[#141724] border-[#2A3144] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.preview} shrink-0`} />
                      <span className="text-xs font-medium truncate">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast(`Section configuration saved.`)}
                  className="px-4 py-2 bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF7A29]/20 hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HERO TYPING & MOTION */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Hero Controls */}
          <div className="lg:col-span-7 bg-[#1C2030] border border-[#2B3245] rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Type className="w-4 h-4 text-[#FF7A29]" />
                <span>Hero Headline Typography & Motion</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Customize the cycling words, typing pace, role badges, and animation mode of the main Hero section.
              </p>
            </div>

            {/* Badges & Prefixes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Greeting Prefix
                </label>
                <input
                  type="text"
                  value={currentHeroAnim.prefixText || "Hi, I'm"}
                  onChange={(e) => updateHeroAnimation({ prefixText: e.target.value })}
                  placeholder="e.g. Hi, I'm"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2E364A] text-white text-xs focus:border-[#FF7A29] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Building Prefix
                </label>
                <input
                  type="text"
                  value={currentHeroAnim.buildingPrefix || "Building"}
                  onChange={(e) => updateHeroAnimation({ buildingPrefix: e.target.value })}
                  placeholder="e.g. Building"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2E364A] text-white text-xs focus:border-[#FF7A29] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Primary Role Badge
                </label>
                <input
                  type="text"
                  value={currentHeroAnim.roleBadgeText || "Software Engineer"}
                  onChange={(e) => updateHeroAnimation({ roleBadgeText: e.target.value })}
                  placeholder="e.g. Software Engineer"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2E364A] text-white text-xs focus:border-[#FF7A29] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Sub-Role Badge
                </label>
                <input
                  type="text"
                  value={currentHeroAnim.subRoleBadgeText || "Full-Stack Developer"}
                  onChange={(e) => updateHeroAnimation({ subRoleBadgeText: e.target.value })}
                  placeholder="e.g. Full-Stack Developer"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2E364A] text-white text-xs focus:border-[#FF7A29] outline-none"
                />
              </div>
            </div>

            {/* Cycling / Typing Phrases List */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2 flex items-center justify-between">
                <span>Cycling Phrases (Typing Words)</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {currentHeroAnim.typingWords?.length || 0} phrases configured
                </span>
              </label>

              <div className="space-y-2 mb-3">
                {(currentHeroAnim.typingWords || defaultHeroAnimation.typingWords).map((word, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2.5 bg-[#141724] border border-[#2A3144] rounded-xl text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#1C2133] flex items-center justify-center font-mono text-[10px] text-[#FF7A29]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-white">{word}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = currentHeroAnim.typingWords.filter((_, i) => i !== idx);
                        if (updated.length === 0) {
                          alert('At least one phrase is required.');
                          return;
                        }
                        updateHeroAnimation({ typingWords: updated });
                      }}
                      className="p-1 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Phrase Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newWordInput}
                  onChange={(e) => setNewWordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newWordInput.trim()) {
                        updateHeroAnimation({
                          typingWords: [...(currentHeroAnim.typingWords || []), newWordInput.trim()]
                        });
                        setNewWordInput('');
                      }
                    }
                  }}
                  placeholder="Add another phrase (e.g. Next.js & React Architectures)..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2E364A] text-white text-xs focus:border-[#FF7A29] outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newWordInput.trim()) {
                      updateHeroAnimation({
                        typingWords: [...(currentHeroAnim.typingWords || []), newWordInput.trim()]
                      });
                      setNewWordInput('');
                    }
                  }}
                  className="px-3 py-2 bg-[#252C42] hover:bg-[#FF7A29] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Speeds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Typing Speed ({currentHeroAnim.typingSpeedMs || 85} ms)
                </label>
                <input
                  type="range"
                  min="40"
                  max="200"
                  step="5"
                  value={currentHeroAnim.typingSpeedMs || 85}
                  onChange={(e) => updateHeroAnimation({ typingSpeedMs: Number(e.target.value) })}
                  className="w-full accent-[#FF7A29]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>Faster (40ms)</span>
                  <span>Slower (200ms)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  End Pause Duration ({(currentHeroAnim.pauseDurationMs || 1800) / 1000}s)
                </label>
                <input
                  type="range"
                  min="800"
                  max="4000"
                  step="200"
                  value={currentHeroAnim.pauseDurationMs || 1800}
                  onChange={(e) => updateHeroAnimation({ pauseDurationMs: Number(e.target.value) })}
                  className="w-full accent-[#FF7A29]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>Short (0.8s)</span>
                  <span>Longer (4s)</span>
                </div>
              </div>
            </div>

            {/* Hero Animation Type */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Headline Motion Animation Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ANIMATION_TYPES.map((anim) => (
                  <button
                    key={anim.id}
                    type="button"
                    onClick={() => updateHeroAnimation({ animationType: anim.id })}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      currentHeroAnim.animationType === anim.id
                        ? 'bg-[#232A42] border-[#FF7A29] text-white shadow-md'
                        : 'bg-[#141724] border-[#2A3144] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{anim.label}</div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{anim.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gradient */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Headline Gradient Theme
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {GRADIENT_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => updateHeroAnimation({ headlineGradient: theme.id })}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      currentHeroAnim.headlineGradient === theme.id
                        ? 'bg-[#232A42] border-[#FF7A29] text-white'
                        : 'bg-[#141724] border-[#2A3144] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${theme.preview} shrink-0`} />
                    <span className="text-xs truncate">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Preview Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#090D1A] border border-indigo-950 rounded-2xl p-6 shadow-2xl relative">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#FF7A29]" />
                <span>Live Hero Simulation</span>
              </div>

              {/* Role Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#FF7A29] font-bold bg-[#FF7A29]/10 px-2 py-0.5 rounded-md border border-[#FF7A29]/20">
                  {currentHeroAnim.roleBadgeText || 'Software Engineer'}
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  {currentHeroAnim.subRoleBadgeText || 'Full-Stack Developer'}
                </span>
              </div>

              {/* Simulated Headline */}
              <div className="text-2xl font-extrabold text-white leading-tight mb-4">
                <span>{currentHeroAnim.prefixText || "Hi, I'm"} </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-300">
                  {data.profile.name}.
                </span>
                <br />
                <span>{currentHeroAnim.buildingPrefix || "Building"} </span>
                <AnimatedHeading
                  title=""
                  accent={currentHeroAnim.typingWords?.[0] || 'Scalable Web Systems'}
                  words={currentHeroAnim.typingWords}
                  animationType={currentHeroAnim.animationType || 'typewriter'}
                  accentGradient={currentHeroAnim.headlineGradient || 'orange-amber'}
                  typingSpeedMs={currentHeroAnim.typingSpeedMs}
                  pauseDurationMs={currentHeroAnim.pauseDurationMs}
                  className="inline-block text-2xl font-extrabold"
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {data.profile.bio}
              </p>
            </div>

            {/* Quick Reset to Defaults */}
            <div className="bg-[#1C2030] border border-[#2B3245] rounded-2xl p-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Reset Hero Settings</div>
                <div className="text-[11px] text-slate-400">Restore factory typing animations and phrases</div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset hero animation settings to defaults?')) {
                    updateHeroAnimation(defaultHeroAnimation);
                    showToast('Hero settings reset to defaults.');
                  }
                }}
                className="px-3 py-1.5 rounded-xl border border-indigo-900/60 hover:bg-[#141724] text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM SECTIONS (FULL CRUD) */}
      {activeTab === 'custom' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C2030] border border-[#2B3245] rounded-2xl p-5">
            <div>
              <h3 className="text-base font-bold text-white">Custom Section Builder</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Create new dedicated landing sections (e.g. Services, Pricing, Tech Advisory, Testimonials, FAQ) with custom card grids.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddCustomSection}
              className="px-4 py-2 bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF7A29]/20 hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Section</span>
            </button>
          </div>

          {/* Existing Custom Sections List */}
          {(!data.customSections || data.customSections.length === 0) ? (
            <div className="bg-[#171A27] border border-[#262C3F] rounded-2xl p-12 text-center">
              <Layers className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-60" />
              <h4 className="text-base font-bold text-white mb-1">No Custom Sections Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
                You haven't created any custom sections yet. Add a new section to display custom services or specialized capabilities on your site.
              </p>
              <button
                type="button"
                onClick={handleOpenAddCustomSection}
                className="px-4 py-2 bg-[#FF7A29] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#ff8a3d] transition-colors cursor-pointer"
              >
                Create First Custom Section
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.customSections.map((sec) => (
                <div
                  key={sec.id}
                  className="bg-[#171A27] border border-[#262C3F] hover:border-[#FF7A29]/40 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1F253A] border border-[#303955] text-[11px] font-mono text-[#FF7A29]">
                        <Zap className="w-3 h-3" />
                        {sec.badge || 'Custom Section'}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${sec.enabled ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                          {sec.enabled ? 'Live' : 'Draft'}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#20273D] text-slate-300 font-mono">
                          {sec.placement}
                        </span>
                      </div>
                    </div>

                    {/* Heading */}
                    <h4 className="text-lg font-bold text-white mb-1.5">
                      <span>{sec.title} </span>
                      <span className="text-[#FF7A29]">{sec.titleAccent}</span>
                      <span> {sec.titleSuffix}</span>
                    </h4>

                    {sec.subtitle && (
                      <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                        {sec.subtitle}
                      </p>
                    )}

                    {/* Card items count */}
                    <div className="text-[11px] font-mono text-slate-500 mb-4">
                      {sec.items?.length || 0} card items in section grid
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#262C3F] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => updateCustomSection(sec.id, { enabled: !sec.enabled })}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {sec.enabled ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{sec.enabled ? 'Hide Section' : 'Publish Section'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditCustomSection(sec)}
                        className="p-1.5 rounded-lg bg-[#222738] hover:bg-[#FF7A29] text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Section"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete custom section "${sec.titleAccent}"?`)) {
                            deleteCustomSection(sec.id);
                            showToast('Custom section deleted.');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-[#222738] hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Delete Section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: ADD / EDIT CUSTOM SECTION */}
      {isCustomSectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#161924] border border-[#282F42] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#282F42] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FF7A29]/20 text-[#FF7A29] flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {editingCustomSection ? 'Edit Custom Section' : 'Create New Custom Section'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomSectionModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#202535] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveCustomSection} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
              {/* Placement & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Page Placement Position
                  </label>
                  <select
                    value={customForm.placement || 'after-projects'}
                    onChange={(e) => setCustomForm({ ...customForm, placement: e.target.value as CustomSectionPlacement })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131D] border border-[#2A3144] text-white text-xs focus:border-[#FF7A29] outline-none"
                  >
                    {PLACEMENT_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Section Badge Text
                  </label>
                  <input
                    type="text"
                    value={customForm.badge || ''}
                    onChange={(e) => setCustomForm({ ...customForm, badge: e.target.value })}
                    placeholder="e.g. Specialized Capabilities"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131D] border border-[#2A3144] text-white text-xs focus:border-[#FF7A29] outline-none"
                  />
                </div>
              </div>

              {/* Title & Accents */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Title Prefix
                  </label>
                  <input
                    type="text"
                    value={customForm.title || ''}
                    onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })}
                    placeholder="e.g. Specialized "
                    className="w-full px-3 py-2 rounded-xl bg-[#10131D] border border-[#2A3144] text-white text-xs focus:border-[#FF7A29] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#FF7A29] font-bold mb-1.5">
                    Highlighted Accent *
                  </label>
                  <input
                    type="text"
                    required
                    value={customForm.titleAccent || ''}
                    onChange={(e) => setCustomForm({ ...customForm, titleAccent: e.target.value })}
                    placeholder="e.g. Engineering Services"
                    className="w-full px-3 py-2 rounded-xl bg-[#10131D] border border-[#FF7A29]/50 text-white text-xs font-semibold focus:border-[#FF7A29] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Title Suffix
                  </label>
                  <input
                    type="text"
                    value={customForm.titleSuffix || ''}
                    onChange={(e) => setCustomForm({ ...customForm, titleSuffix: e.target.value })}
                    placeholder="e.g. & Advisory"
                    className="w-full px-3 py-2 rounded-xl bg-[#10131D] border border-[#2A3144] text-white text-xs focus:border-[#FF7A29] outline-none"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Section Subtitle
                </label>
                <textarea
                  rows={2}
                  value={customForm.subtitle || ''}
                  onChange={(e) => setCustomForm({ ...customForm, subtitle: e.target.value })}
                  placeholder="Short introductory description for the section..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#10131D] border border-[#2A3144] text-white text-xs focus:border-[#FF7A29] outline-none resize-none"
                />
              </div>

              {/* Animation Mode & Gradient */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Heading Animation Type
                  </label>
                  <select
                    value={customForm.animationType || 'gradient-shimmer'}
                    onChange={(e) => setCustomForm({ ...customForm, animationType: e.target.value as HeadingAnimationType })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131D] border border-[#2A3144] text-white text-xs focus:border-[#FF7A29] outline-none"
                  >
                    {ANIMATION_TYPES.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Accent Color Gradient
                  </label>
                  <select
                    value={customForm.accentGradient || 'orange-amber'}
                    onChange={(e) => setCustomForm({ ...customForm, accentGradient: e.target.value as AccentGradientTheme })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131D] border border-[#2A3144] text-white text-xs focus:border-[#FF7A29] outline-none"
                  >
                    {GRADIENT_THEMES.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Section Card Items */}
              <div className="pt-3 border-t border-[#262C3F]">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono text-white font-bold">
                    Section Card Items (Grid)
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {customForm.items?.length || 0} cards
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-2 mb-3">
                  {(customForm.items || []).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 bg-[#10131D] border border-[#262C3E] rounded-xl flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white">{item.title}</span>
                          {item.badge && (
                            <span className="px-2 py-0.2 rounded bg-[#1D2439] text-[#FF7A29] text-[10px] font-mono">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = (customForm.items || []).filter((_, i) => i !== idx);
                          setCustomForm({ ...customForm, items: updated });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Item Row */}
                <div className="p-3 bg-[#121622] border border-[#282F42] rounded-xl space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newItemTitle}
                      onChange={(e) => setNewItemTitle(e.target.value)}
                      placeholder="Item Title (e.g. Next.js Consulting)..."
                      className="px-3 py-1.5 rounded-lg bg-[#0D1018] border border-[#2A3144] text-white text-xs outline-none focus:border-[#FF7A29]"
                    />
                    <input
                      type="text"
                      value={newItemBadge}
                      onChange={(e) => setNewItemBadge(e.target.value)}
                      placeholder="Badge (e.g. High Demand)..."
                      className="px-3 py-1.5 rounded-lg bg-[#0D1018] border border-[#2A3144] text-white text-xs outline-none focus:border-[#FF7A29]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newItemDesc}
                      onChange={(e) => setNewItemDesc(e.target.value)}
                      placeholder="Short description of this offering..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#0D1018] border border-[#2A3144] text-white text-xs outline-none focus:border-[#FF7A29]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newItemTitle.trim()) return;
                        const item = {
                          id: 'item-' + Date.now(),
                          title: newItemTitle.trim(),
                          description: newItemDesc.trim() || 'Comprehensive engineering solution delivered with quality.',
                          badge: newItemBadge.trim()
                        };
                        setCustomForm({
                          ...customForm,
                          items: [...(customForm.items || []), item]
                        });
                        setNewItemTitle('');
                        setNewItemDesc('');
                        setNewItemBadge('');
                      }}
                      className="px-3 py-1.5 bg-[#252C40] hover:bg-[#FF7A29] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Card</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#282F42] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustomSectionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#202536] hover:bg-[#282E42] text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF7A29]/20 hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingCustomSection ? 'Update Section' : 'Create Section'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
