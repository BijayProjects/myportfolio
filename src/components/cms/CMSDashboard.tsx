import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploadField } from '../common/ImageUploadField';
import {
  Project,
  WorkEntry,
  BlogPost,
  GalleryItem,
  ContactMessage,
  ProjectCategory,
  GalleryCategory
} from '../../types';
import {
  X,
  Sliders,
  User,
  FolderGit2,
  Briefcase,
  BookOpen,
  Camera,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Save,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Star,
  Eye,
  AlertCircle,
  FileText,
  Layers,
  Sparkles,
  Search,
  Copy
} from 'lucide-react';

export const CMSDashboard: React.FC = () => {
  const {
    data,
    isCMSOpen,
    setIsCMSOpen,
    cmsTab,
    setCmsTab,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addWorkEntry,
    updateWorkEntry,
    deleteWorkEntry,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    markMessageStatus,
    toggleMessageStarred,
    deleteMessage,
    updateSettings,
    resetToDefaults,
    exportDataJson,
    importDataJson
  } = usePortfolio();

  // Active sub-editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [editingWork, setEditingWork] = useState<WorkEntry | null>(null);
  const [isCreatingWork, setIsCreatingWork] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);

  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isCreatingGallery, setIsCreatingGallery] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'starred'>('all');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!isCMSOpen) return null;

  const unreadCount = (data.messages || []).filter(m => m.status === 'unread').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-lg animate-fadeIn text-slate-100 select-none">
      <div className="relative w-full max-w-6xl h-[94vh] bg-[#0A0E24] border border-indigo-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top CMS Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#070A1A] border-b border-indigo-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF7A29] to-[#FA5D00] flex items-center justify-center text-white shadow-md shadow-[#FF7A29]/30">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">Portfolio CMS Admin Studio</h2>
                <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800/60 text-indigo-300 font-mono text-[10px]">
                  Live Synchronized
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Manage your bio, projects, work timeline, blog articles, gallery images, and incoming inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exportDataJson();
                showToast('Exported portfolio backup JSON!');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-800/50 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Download full JSON backup"
            >
              <Download className="w-3.5 h-3.5 text-[#FF7A29]" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => setIsCMSOpen(false)}
              className="p-2 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body with Sidebar + Tab Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-60 bg-[#080C1E] border-r border-indigo-950/80 p-3 flex md:flex-col gap-1 shrink-0 overflow-x-auto md:overflow-x-visible">
            {[
              { id: 'profile', label: 'Profile & Bio', icon: User },
              { id: 'projects', label: `Projects (${(data.projects || []).length})`, icon: FolderGit2 },
              { id: 'work', label: `Work History (${(data.workEntries || []).length})`, icon: Briefcase },
              { id: 'blog', label: `Blog Articles (${(data.blogPosts || []).length})`, icon: BookOpen },
              { id: 'gallery', label: `High-Res Gallery (${(data.gallery || []).length})`, icon: Camera },
              { id: 'messages', label: `Inquiries (${unreadCount > 0 ? `${unreadCount} new` : (data.messages || []).length})`, icon: Mail, badge: unreadCount },
              { id: 'settings', label: 'Backup & Reset', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = cmsTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCmsTab(tab.id as any);
                    setEditingProject(null);
                    setIsCreatingProject(false);
                    setEditingWork(null);
                    setIsCreatingWork(false);
                    setEditingBlog(null);
                    setIsCreatingBlog(false);
                    setEditingGallery(null);
                    setIsCreatingGallery(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white shadow-md shadow-[#FF7A29]/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-indigo-950/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && tab.badge > 0 && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A29] animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Main Content Panel */}
          <div className="flex-1 bg-[#0A0E24] p-4 sm:p-6 overflow-y-auto">
            {/* Toast Notification */}
            {toastMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn shadow-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{toastMessage}</span>
                </div>
                <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* TAB 1: PROFILE & BIO */}
            {cmsTab === 'profile' && (
              <ProfileEditor
                profile={data.profile}
                onSave={(updated) => {
                  updateProfile(updated);
                  showToast('Profile information successfully updated!');
                }}
              />
            )}

            {/* TAB 2: PROJECTS */}
            {cmsTab === 'projects' && (
              <div>
                {isCreatingProject || editingProject ? (
                  <ProjectForm
                    initialData={editingProject}
                    onSave={(projData) => {
                      if (editingProject) {
                        updateProject(editingProject.id, projData);
                        showToast(`Updated project "${projData.title}"`);
                      } else {
                        addProject(projData);
                        showToast(`Created new project "${projData.title}"`);
                      }
                      setEditingProject(null);
                      setIsCreatingProject(false);
                    }}
                    onCancel={() => {
                      setEditingProject(null);
                      setIsCreatingProject(false);
                    }}
                  />
                ) : (
                  <ProjectsList
                    projects={data.projects}
                    onNew={() => setIsCreatingProject(true)}
                    onEdit={(p) => setEditingProject(p)}
                    onDelete={(id) => {
                      deleteProject(id);
                      showToast('Project deleted');
                    }}
                  />
                )}
              </div>
            )}

            {/* TAB 3: WORK HISTORY */}
            {cmsTab === 'work' && (
              <div>
                {isCreatingWork || editingWork ? (
                  <WorkForm
                    initialData={editingWork}
                    onSave={(workData) => {
                      if (editingWork) {
                        updateWorkEntry(editingWork.id, workData);
                        showToast('Work entry updated');
                      } else {
                        addWorkEntry(workData);
                        showToast('New work entry added');
                      }
                      setEditingWork(null);
                      setIsCreatingWork(false);
                    }}
                    onCancel={() => {
                      setEditingWork(null);
                      setIsCreatingWork(false);
                    }}
                  />
                ) : (
                  <WorkList
                    entries={data.workEntries}
                    onNew={() => setIsCreatingWork(true)}
                    onEdit={(w) => setEditingWork(w)}
                    onDelete={(id) => {
                      deleteWorkEntry(id);
                      showToast('Work entry deleted');
                    }}
                  />
                )}
              </div>
            )}

            {/* TAB 4: BLOG POSTS */}
            {cmsTab === 'blog' && (
              <div>
                {isCreatingBlog || editingBlog ? (
                  <BlogForm
                    initialData={editingBlog}
                    onSave={(blogData) => {
                      if (editingBlog) {
                        updateBlogPost(editingBlog.id, blogData);
                        showToast(`Updated blog post "${blogData.title}"`);
                      } else {
                        addBlogPost(blogData);
                        showToast(`Published blog post "${blogData.title}"`);
                      }
                      setEditingBlog(null);
                      setIsCreatingBlog(false);
                    }}
                    onCancel={() => {
                      setEditingBlog(null);
                      setIsCreatingBlog(false);
                    }}
                  />
                ) : (
                  <BlogList
                    posts={data.blogPosts}
                    onNew={() => setIsCreatingBlog(true)}
                    onEdit={(b) => setEditingBlog(b)}
                    onDelete={(id) => {
                      deleteBlogPost(id);
                      showToast('Blog post deleted');
                    }}
                  />
                )}
              </div>
            )}

            {/* TAB 5: GALLERY */}
            {cmsTab === 'gallery' && (
              <div>
                {isCreatingGallery || editingGallery ? (
                  <GalleryForm
                    initialData={editingGallery}
                    onSave={(galData) => {
                      if (editingGallery) {
                        updateGalleryItem(editingGallery.id, galData);
                        showToast('Gallery image updated');
                      } else {
                        addGalleryItem(galData);
                        showToast('New high-res image added to gallery');
                      }
                      setEditingGallery(null);
                      setIsCreatingGallery(false);
                    }}
                    onCancel={() => {
                      setEditingGallery(null);
                      setIsCreatingGallery(false);
                    }}
                  />
                ) : (
                  <GalleryList
                    items={data.gallery}
                    onNew={() => setIsCreatingGallery(true)}
                    onEdit={(g) => setEditingGallery(g)}
                    onDelete={(id) => {
                      deleteGalleryItem(id);
                      showToast('Gallery item removed');
                    }}
                  />
                )}
              </div>
            )}

            {/* TAB 6: MESSAGES & INQUIRIES */}
            {cmsTab === 'messages' && (
              <MessagesViewer
                messages={data.messages}
                selectedMessage={selectedMessage}
                onSelect={(m) => {
                  setSelectedMessage(m);
                  if (m.status === 'unread') {
                    markMessageStatus(m.id, 'read');
                  }
                }}
                onToggleStar={(id) => toggleMessageStarred(id)}
                onDelete={(id) => {
                  deleteMessage(id);
                  if (selectedMessage?.id === id) setSelectedMessage(null);
                  showToast('Message deleted');
                }}
                onMarkStatus={(id, status) => markMessageStatus(id, status)}
              />
            )}

            {/* TAB 7: BACKUP & SETTINGS */}
            {cmsTab === 'settings' && (
              <BackupAndSettings
                onReset={() => {
                  if (window.confirm('Reset all portfolio data back to default PDF resume info?')) {
                    resetToDefaults();
                    showToast('Portfolio restored to PDF defaults!');
                  }
                }}
                onExport={exportDataJson}
                onImport={(text) => {
                  const ok = importDataJson(text);
                  if (ok) {
                    showToast('Portfolio data imported successfully!');
                  } else {
                    alert('Invalid JSON structure. Please check the backup format.');
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SUB-COMPONENTS FOR CMS TABS
   ========================================================= */

// --- 1. PROFILE EDITOR ---
const ProfileEditor: React.FC<{
  profile: any;
  onSave: (data: any) => void;
}> = ({ profile, onSave }) => {
  const [form, setForm] = useState(profile);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
        <div>
          <h3 className="text-lg font-bold text-white">Edit Profile & Contact Details</h3>
          <p className="text-xs text-slate-400">Update your hero presentation, email, phone, and resume bio.</p>
        </div>
        <button
          onClick={() => onSave(form)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md shadow-[#FF7A29]/20 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Tagline / Title</label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Phone Number</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Years of Experience</label>
          <input
            type="text"
            value={form.yearsExperience}
            onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn URL</label>
          <input
            type="text"
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">GitHub URL</label>
          <input
            type="text"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-300 mb-1">Hero Bio Summary</label>
        <textarea
          rows={3}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29] resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-300 mb-1">Professional Summary (From Resume)</label>
        <textarea
          rows={3}
          value={form.professionalSummary}
          onChange={(e) => setForm({ ...form, professionalSummary: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29] resize-none"
        />
      </div>
    </div>
  );
};

// --- 2. PROJECTS LIST & FORM ---
const ProjectsList: React.FC<{
  projects: Project[];
  onNew: () => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}> = ({ projects, onNew, onEdit, onDelete }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
      <div>
        <h3 className="text-lg font-bold text-white">Project Showcase Manager</h3>
        <p className="text-xs text-slate-400">Add, edit, or remove featured software projects.</p>
      </div>
      <button
        onClick={onNew}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF7A29] hover:bg-[#ff6912] text-white text-xs font-bold cursor-pointer shadow-md shadow-[#FF7A29]/20"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Project</span>
      </button>
    </div>

    <div className="grid grid-cols-1 gap-3">
      {projects.map((p) => (
        <div
          key={p.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#080C1E] border border-indigo-950 hover:border-indigo-800/60 transition-all"
        >
          <div className="flex items-center gap-3.5">
            <img
              src={p.coverImage}
              alt={p.title}
              className="w-16 h-12 rounded-lg object-cover bg-slate-950 shrink-0 border border-indigo-950"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{p.title}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-[#FF7A29] font-mono text-[10px] border border-indigo-800/40">
                  {p.category}
                </span>
                {p.featured && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px]">
                    ★ Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{p.summary}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => onEdit(p)}
              className="p-2 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 hover:text-white border border-indigo-800/40 cursor-pointer"
              title="Edit Project"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete project "${p.title}"?`)) onDelete(p.id);
              }}
              className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-white border border-red-800/40 cursor-pointer"
              title="Delete Project"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProjectForm: React.FC<{
  initialData: Project | null;
  onSave: (data: Omit<Project, 'id'>) => void;
  onCancel: () => void;
}> = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: (initialData?.category || 'Full-Stack') as ProjectCategory,
    summary: initialData?.summary || '',
    fullDescription: initialData?.fullDescription || '',
    coverImage: initialData?.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    techStackText: initialData?.techStack?.join(', ') || 'Python, Django, Tailwind CSS',
    featuresText: initialData?.features?.join('\n') || 'Secure Authentication\nResponsive Dashboard\nREST API Endpoints',
    resultsOrMetrics: initialData?.resultsOrMetrics || '',
    liveUrl: initialData?.liveUrl || '',
    githubUrl: initialData?.githubUrl || '',
    client: initialData?.client || '',
    duration: initialData?.duration || '',
    featured: initialData?.featured ?? true,
    date: initialData?.date || '2024',
    screenshots: initialData?.screenshots || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: form.category,
      summary: form.summary,
      fullDescription: form.fullDescription,
      coverImage: form.coverImage,
      screenshots: [form.coverImage],
      techStack: form.techStackText.split(',').map(s => s.trim()).filter(Boolean),
      features: form.featuresText.split('\n').map(s => s.trim()).filter(Boolean),
      resultsOrMetrics: form.resultsOrMetrics,
      liveUrl: form.liveUrl,
      githubUrl: form.githubUrl,
      client: form.client,
      duration: form.duration,
      featured: form.featured,
      date: form.date
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Project' : 'Create New Project'}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold cursor-pointer"
          >
            Save Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Project Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as any })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          >
            {['Full-Stack', 'WordPress', 'AI Automation', 'Backend API', 'Frontend UI'].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <ImageUploadField
            label="Cover Image"
            description="Update via URL, drag-and-drop, or local device file browser."
            value={form.coverImage}
            onChange={(url) => setForm({ ...form, coverImage: url })}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-mono text-slate-300 mb-1">Short Summary *</label>
          <input
            type="text"
            required
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-mono text-slate-300 mb-1">Full Description & Architecture</label>
          <textarea
            rows={4}
            value={form.fullDescription}
            onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29] resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Tech Stack (comma separated)</label>
          <input
            type="text"
            value={form.techStackText}
            onChange={(e) => setForm({ ...form, techStackText: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Impact / Metric Result</label>
          <input
            type="text"
            placeholder="e.g. 98+ PageSpeed score"
            value={form.resultsOrMetrics}
            onChange={(e) => setForm({ ...form, resultsOrMetrics: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Live Demo URL</label>
          <input
            type="text"
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">GitHub Repo URL</label>
          <input
            type="text"
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Key Features (one per line)</label>
          <textarea
            rows={3}
            value={form.featuresText}
            onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none focus:border-[#FF7A29] resize-none"
          />
        </div>

        <div className="flex flex-col justify-end space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured-check"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded bg-[#080C1E] border-indigo-950 text-[#FF7A29] focus:ring-[#FF7A29]"
            />
            <label htmlFor="featured-check" className="text-xs text-slate-300">Feature this project on home page</label>
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Year</label>
            <input
              type="text"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-24 px-3 py-1.5 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

// --- 3. WORK HISTORY LIST & FORM ---
const WorkList: React.FC<{
  entries: WorkEntry[];
  onNew: () => void;
  onEdit: (w: WorkEntry) => void;
  onDelete: (id: string) => void;
}> = ({ entries, onNew, onEdit, onDelete }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
      <div>
        <h3 className="text-lg font-bold text-white">Career & Work History</h3>
        <p className="text-xs text-slate-400">Manage client milestones and employment timeline.</p>
      </div>
      <button
        onClick={onNew}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF7A29] hover:bg-[#ff6912] text-white text-xs font-bold cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Work Entry</span>
      </button>
    </div>

    <div className="space-y-3">
      {entries.map((w) => (
        <div
          key={w.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#080C1E] border border-indigo-950"
        >
          <div>
            <span className="text-[10px] font-mono text-[#FF7A29] uppercase">{w.type} • {w.period}</span>
            <h4 className="text-sm font-bold text-white">{w.role}</h4>
            <p className="text-xs text-slate-400">{w.organization} — {w.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(w)}
              className="p-2 rounded-lg bg-indigo-950 text-indigo-300 hover:text-white"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete entry "${w.role}"?`)) onDelete(w.id);
              }}
              className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:text-white"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WorkForm: React.FC<{
  initialData: WorkEntry | null;
  onSave: (data: Omit<WorkEntry, 'id'>) => void;
  onCancel: () => void;
}> = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState({
    role: initialData?.role || '',
    organization: initialData?.organization || '',
    period: initialData?.period || '2024 — Present',
    type: (initialData?.type || 'Full-time') as any,
    location: initialData?.location || 'Kathmandu, Nepal / Remote',
    description: initialData?.description || '',
    highlightsText: initialData?.highlights?.join('\n') || '',
    techStackText: initialData?.techStack?.join(', ') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      role: form.role,
      organization: form.organization,
      period: form.period,
      type: form.type,
      location: form.location,
      description: form.description,
      highlights: form.highlightsText.split('\n').map(s => s.trim()).filter(Boolean),
      techStack: form.techStackText.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Work Entry' : 'Add Work Entry'}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-[#FF7A29] text-white text-xs font-bold"
          >
            Save Entry
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Role Title *</label>
          <input
            type="text"
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Organization / Client *</label>
          <input
            type="text"
            required
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Time Period</label>
          <input
            type="text"
            value={form.period}
            onChange={(e) => setForm({ ...form, period: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Engagement Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as any })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          >
            <option value="Full-time">Full-time</option>
            <option value="Freelance / Contract">Freelance / Contract</option>
            <option value="Project Engagement">Project Engagement</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-slate-300 mb-1">Summary Description</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none resize-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-slate-300 mb-1">Deliverables & Highlights (one per line)</label>
          <textarea
            rows={3}
            value={form.highlightsText}
            onChange={(e) => setForm({ ...form, highlightsText: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none resize-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-slate-300 mb-1">Tech Stack (comma separated)</label>
          <input
            type="text"
            value={form.techStackText}
            onChange={(e) => setForm({ ...form, techStackText: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          />
        </div>
      </div>
    </form>
  );
};

// --- 4. BLOG LIST & FORM ---
const BlogList: React.FC<{
  posts: BlogPost[];
  onNew: () => void;
  onEdit: (b: BlogPost) => void;
  onDelete: (id: string) => void;
}> = ({ posts, onNew, onEdit, onDelete }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
      <div>
        <h3 className="text-lg font-bold text-white">Engineering Blog Posts</h3>
        <p className="text-xs text-slate-400">Write, edit, and publish independent blog articles.</p>
      </div>
      <button
        onClick={onNew}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF7A29] text-white text-xs font-bold cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>New Article</span>
      </button>
    </div>

    <div className="space-y-3">
      {posts.map((b) => (
        <div
          key={b.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#080C1E] border border-indigo-950"
        >
          <div className="flex items-center gap-3">
            <img
              src={b.coverImage}
              alt={b.title}
              className="w-16 h-12 rounded-lg object-cover bg-slate-950 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">{b.title}</h4>
                <span className={`px-2 py-0.2 rounded text-[10px] font-mono ${b.isPublished ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  {b.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{b.excerpt}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(b)}
              className="p-2 rounded-lg bg-indigo-950 text-indigo-300 hover:text-white"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete article "${b.title}"?`)) onDelete(b.id);
              }}
              className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:text-white"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BlogForm: React.FC<{
  initialData: BlogPost | null;
  onSave: (data: Omit<BlogPost, 'id' | 'views'>) => void;
  onCancel: () => void;
}> = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    tagsText: initialData?.tags?.join(', ') || 'Python, Backend, API',
    publishedAt: initialData?.publishedAt || 'Today',
    readTime: initialData?.readTime || '4 min read',
    author: initialData?.author || 'Bijaya Tamang',
    isPublished: initialData?.isPublished ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      tags: form.tagsText.split(',').map(s => s.trim()).filter(Boolean),
      publishedAt: form.publishedAt,
      readTime: form.readTime,
      author: form.author,
      isPublished: form.isPublished
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Article' : 'Write New Article'}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-[#FF7A29] text-white text-xs font-bold"
          >
            Save Article
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Article Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          />
        </div>

        <div>
          <ImageUploadField
            label="Cover Image"
            description="Update via URL, drag-and-drop, or local file browse."
            value={form.coverImage}
            onChange={(url) => setForm({ ...form, coverImage: url })}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Short Excerpt *</label>
          <textarea
            rows={2}
            required
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Full Markdown / Text Content</label>
          <textarea
            rows={8}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white font-mono text-xs outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={form.tagsText}
              onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Read Time</label>
            <input
              type="text"
              value={form.readTime}
              onChange={(e) => setForm({ ...form, readTime: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              id="blog-publish-check"
              checked={form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
              className="rounded bg-[#080C1E] text-[#FF7A29]"
            />
            <label htmlFor="blog-publish-check" className="text-xs text-slate-300">Publish live</label>
          </div>
        </div>
      </div>
    </form>
  );
};

// --- 5. GALLERY LIST & FORM ---
const GalleryList: React.FC<{
  items: GalleryItem[];
  onNew: () => void;
  onEdit: (g: GalleryItem) => void;
  onDelete: (id: string) => void;
}> = ({ items, onNew, onEdit, onDelete }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
      <div>
        <h3 className="text-lg font-bold text-white">High-Resolution Gallery Manager</h3>
        <p className="text-xs text-slate-400">Curate 4K/Retina screenshots, architecture maps, and UI mockups.</p>
      </div>
      <button
        onClick={onNew}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF7A29] text-white text-xs font-bold cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Image</span>
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((g) => (
        <div
          key={g.id}
          className="rounded-xl bg-[#080C1E] border border-indigo-950 overflow-hidden flex flex-col justify-between"
        >
          <div className="relative aspect-video bg-black">
            <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-emerald-400 font-mono text-[9px]">
              {g.resolution}
            </span>
          </div>
          <div className="p-3">
            <h4 className="text-xs font-bold text-white line-clamp-1">{g.title}</h4>
            <p className="text-[11px] text-slate-400 line-clamp-1">{g.category}</p>
            <div className="mt-3 pt-2 border-t border-indigo-950 flex items-center justify-end gap-2">
              <button
                onClick={() => onEdit(g)}
                className="p-1.5 rounded bg-indigo-950 text-indigo-300 hover:text-white"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete "${g.title}"?`)) onDelete(g.id);
                }}
                className="p-1.5 rounded bg-red-950/40 text-red-400 hover:text-white"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GalleryForm: React.FC<{
  initialData: GalleryItem | null;
  onSave: (data: Omit<GalleryItem, 'id'>) => void;
  onCancel: () => void;
}> = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    category: (initialData?.category || 'Web Apps') as GalleryCategory,
    imageUrl: initialData?.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
    highResUrl: initialData?.highResUrl || '',
    resolution: initialData?.resolution || '4K (3840 x 2160)',
    aspectRatio: initialData?.aspectRatio || '16:9',
    description: initialData?.description || '',
    date: initialData?.date || '2024',
    tagsText: initialData?.tags?.join(', ') || 'Full-Stack, UI'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: form.title,
      category: form.category,
      imageUrl: form.imageUrl,
      highResUrl: form.highResUrl || form.imageUrl,
      resolution: form.resolution,
      aspectRatio: form.aspectRatio,
      description: form.description,
      date: form.date,
      tags: form.tagsText.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Gallery Image' : 'Add High-Res Image'}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-[#FF7A29] text-white text-xs font-bold"
          >
            Save Image
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Image Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as any })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          >
            {['Web Apps', 'WordPress', 'AI Systems', 'UI/UX Mockups', 'Architecture'].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 space-y-3">
          <ImageUploadField
            label="Preview Image Asset *"
            description="Update via URL, drag-and-drop, or local device file browser."
            value={form.imageUrl}
            onChange={(url) =>
              setForm({
                ...form,
                imageUrl: url,
                highResUrl: form.highResUrl || url
              })
            }
            required
          />

          <ImageUploadField
            label="Full 4K / High-Res Image (Optional)"
            description="Optional high-resolution asset URL, drag-and-drop or file upload."
            value={form.highResUrl}
            onChange={(url) => setForm({ ...form, highResUrl: url })}
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Resolution Tag</label>
          <input
            type="text"
            value={form.resolution}
            onChange={(e) => setForm({ ...form, resolution: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={form.tagsText}
            onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-slate-300 mb-1">Image Description / Caption</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#080C1E] border border-indigo-950 text-white text-xs outline-none resize-none"
          />
        </div>
      </div>
    </form>
  );
};

// --- 6. MESSAGES & INBOX ---
const MessagesViewer: React.FC<{
  messages: ContactMessage[];
  selectedMessage: ContactMessage | null;
  onSelect: (m: ContactMessage) => void;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkStatus: (id: string, status: 'unread' | 'read' | 'archived') => void;
}> = ({ messages, selectedMessage, onSelect, onToggleStar, onDelete, onMarkStatus }) => {
  return (
    <div className="h-full flex flex-col sm:flex-row gap-4">
      {/* Message List */}
      <div className="w-full sm:w-1/2 flex flex-col space-y-2 border-r border-indigo-950/80 pr-2">
        <div className="pb-2 border-b border-indigo-950 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Inquiries Inbox ({messages.length})</h3>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">
              No messages received yet.
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                onClick={() => onSelect(m)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedMessage?.id === m.id
                    ? 'bg-indigo-950 border-[#FF7A29]'
                    : m.status === 'unread'
                    ? 'bg-[#0E1430] border-indigo-700/60'
                    : 'bg-[#080C1E] border-indigo-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${m.status === 'unread' ? 'text-white' : 'text-slate-300'}`}>
                    {m.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-indigo-300 font-medium line-clamp-1 mt-0.5">{m.subject}</div>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{m.message}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="w-full sm:w-1/2 flex flex-col bg-[#080C1E] rounded-xl p-4 border border-indigo-950">
        {selectedMessage ? (
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-indigo-950">
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedMessage.subject}</h4>
                  <div className="text-xs text-indigo-300 font-mono">From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;</div>
                </div>
                <button
                  onClick={() => onDelete(selectedMessage.id)}
                  className="p-1.5 rounded bg-red-950/50 text-red-400 hover:text-white"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Interest: <span className="text-[#FF7A29]">{selectedMessage.serviceInterest}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#050714] border border-indigo-950 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                {selectedMessage.message}
              </div>
            </div>

            <div className="pt-3 border-t border-indigo-950 flex items-center justify-between">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF7A29] text-white text-xs font-bold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>

              <span className="text-[10px] text-slate-400 font-mono">
                {new Date(selectedMessage.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-500">
            Select a message from the list to read details
          </div>
        )}
      </div>
    </div>
  );
};

// --- 7. BACKUP & RESET ---
const BackupAndSettings: React.FC<{
  onReset: () => void;
  onExport: () => void;
  onImport: (json: string) => void;
}> = ({ onReset, onExport, onImport }) => {
  const [jsonText, setJsonText] = useState('');

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-indigo-950">
        <h3 className="text-lg font-bold text-white">Data Portability & Backup Settings</h3>
        <p className="text-xs text-slate-400">Download your portfolio configuration, import JSON files, or reset to original PDF resume state.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Export Card */}
        <div className="p-5 rounded-2xl bg-[#080C1E] border border-indigo-950 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-900/50 text-indigo-300 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Export Portfolio Backup</h4>
          <p className="text-xs text-slate-400">Save a complete JSON snapshot of all your projects, blog posts, work history, and settings to your computer.</p>
          <button
            onClick={onExport}
            className="w-full py-2.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Backup (.json)</span>
          </button>
        </div>

        {/* Reset Card */}
        <div className="p-5 rounded-2xl bg-[#080C1E] border border-red-950/60 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/50 text-red-400 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Reset to PDF Resume Default</h4>
          <p className="text-xs text-slate-400">Reverts all portfolio data back to Bijaya Tamang's verified initial resume configuration.</p>
          <button
            onClick={onReset}
            className="w-full py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-200 hover:text-white border border-red-800/40 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Data</span>
          </button>
        </div>
      </div>

      {/* JSON Import Box */}
      <div className="p-5 rounded-2xl bg-[#080C1E] border border-indigo-950 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-[#FF7A29]" />
          <span>Import Portfolio JSON Backup</span>
        </h4>
        <textarea
          rows={4}
          placeholder="Paste your exported JSON backup code here..."
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#050714] border border-indigo-950 text-slate-300 font-mono text-xs outline-none"
        />
        <button
          onClick={() => {
            if (jsonText.trim()) onImport(jsonText);
          }}
          disabled={!jsonText.trim()}
          className="px-4 py-2 rounded-xl bg-[#FF7A29] text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
        >
          Import & Apply Data
        </button>
      </div>
    </div>
  );
};
