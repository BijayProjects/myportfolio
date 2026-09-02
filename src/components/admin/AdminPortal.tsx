import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { TaploxSidebar, TaploxNavSection } from './TaploxSidebar';
import { TaploxTopbar } from './TaploxTopbar';
import { TaploxDashboardView } from './TaploxDashboardView';
import { TaploxUIKitView } from './TaploxUIKitView';
import { TaploxAuthPreviews } from './TaploxAuthPreviews';
import { CRMSection } from './CRMSection';
import { ERPSection } from './ERPSection';
import { AdminPasswordChangeModal } from './AdminPasswordChangeModal';
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
  User,
  FolderGit2,
  Briefcase,
  BookOpen,
  Image as ImageIcon,
  Mail,
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
  Database,
  ArrowRight,
  ShieldCheck,
  Search,
  Check
} from 'lucide-react';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const {
    data,
    adminLogout,
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
    convertMessageToLead,
    updateSettings,
    resetToDefaults,
    exportDataJson,
    importDataJson
  } = usePortfolio();

  // Navigation state (Default to Taplox Dashboard!)
  const [currentSection, setCurrentSection] = useState<TaploxNavSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Password change modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Active CMS sub-editing states
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

  return (
    <div className="fixed inset-0 z-50 flex bg-[#161922] text-slate-100 font-sans select-none overflow-hidden">
      {/* Taplox Left Sidebar */}
      <TaploxSidebar
        currentSection={currentSection}
        onSelectSection={(sec) => setCurrentSection(sec)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onExitToSite={onClose}
        onOpenCredentials={() => setIsPasswordModalOpen(true)}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1B1E28] overflow-hidden">
        {/* Taplox Top Navigation Bar */}
        <TaploxTopbar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onSelectSection={(sec) => setCurrentSection(sec)}
          onOpenCredentials={() => setIsPasswordModalOpen(true)}
          onExitToSite={onClose}
          currentSection={currentSection}
        />

        {/* Scrollable Viewport Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          {/* 1. DASHBOARD VIEW (Default exact replica of Taplox screenshot) */}
          {currentSection === 'dashboard' && <TaploxDashboardView />}

          {/* 2. CMS: PROFILE & BIO */}
          {currentSection === 'cms-profile' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Profile & Bio Configuration</h1>
                  <p className="text-xs text-slate-400 mt-1">Update personal info, contact details and professional summary.</p>
                </div>
                <div className="text-xs text-slate-400">
                  <span>Taplox</span> › <span>CMS</span> › <span className="text-slate-200">Profile</span>
                </div>
              </div>

              <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-6 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={data.profile.name}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Title</label>
                    <input
                      type="text"
                      value={data.profile.title}
                      onChange={(e) => updateProfile({ title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={data.profile.email}
                      onChange={(e) => updateProfile({ email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={data.profile.phone}
                      onChange={(e) => updateProfile({ phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
                    <input
                      type="text"
                      value={data.profile.location}
                      onChange={(e) => updateProfile({ location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Bio Summary</label>
                  <textarea
                    rows={4}
                    value={data.profile.bio}
                    onChange={(e) => updateProfile({ bio: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Availability Status</label>
                    <input
                      type="text"
                      value={data.profile.availability}
                      onChange={(e) => updateProfile({ availability: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Years Experience Badge</label>
                    <input
                      type="text"
                      value={data.profile.yearsExperience}
                      onChange={(e) => updateProfile({ yearsExperience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={data.profile.linkedin}
                      onChange={(e) => updateProfile({ linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub Profile URL</label>
                    <input
                      type="text"
                      value={data.profile.github}
                      onChange={(e) => updateProfile({ github: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#272D3D] flex justify-end">
                  <button
                    onClick={() => showToast('Profile details updated successfully!')}
                    className="px-5 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold shadow-md shadow-[#3E60D5]/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. CMS: PROJECTS */}
          {currentSection === 'cms-projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Projects Showcase ({data.projects.length})
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage portfolio case studies, live demo links, github repos and tags.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newProj: Project = {
                      id: `proj-${Date.now()}`,
                      title: 'New Showcase Project',
                      slug: `project-${Date.now()}`,
                      category: 'Full-Stack',
                      summary: 'High-performance web architecture engineered with modern technology.',
                      fullDescription: 'Detailed overview of technical challenges, architecture choices and outcomes.',
                      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
                      screenshots: [],
                      techStack: ['React', 'TypeScript', 'Node.js'],
                      features: ['High-speed rendering', 'Secure auth'],
                      featured: true,
                      date: '2026'
                    };
                    addProject(newProj);
                    setEditingProject(newProj);
                    showToast('Created new project!');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#3E60D5]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-[#1D212E] border border-[#272D3D] hover:border-[#3E60D5]/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all"
                  >
                    <div className="relative h-44 bg-[#161922] overflow-hidden">
                      <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-mono border border-white/10 uppercase">
                        {proj.category}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-white text-sm">{proj.title}</h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.summary}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {proj.techStack.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-[#161922] text-[#60A5FA] text-[10px] font-mono border border-[#272D3D]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 mt-4 border-t border-[#272D3D] flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono">
                          {proj.date}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const updated = { ...proj, featured: !proj.featured };
                              updateProject(proj.id, updated);
                              showToast(`Project featured status updated!`);
                            }}
                            className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                              proj.featured
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : 'border-[#272D3D] text-slate-400'
                            }`}
                            title="Toggle Featured"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CMS: WORK HISTORY */}
          {currentSection === 'cms-work' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Work History & Career Timeline ({(data.workEntries || []).length})
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Manage professional roles, company experience, and achievements.</p>
                </div>
                <button
                  onClick={() => {
                    const newWork: WorkEntry = {
                      id: `work-${Date.now()}`,
                      role: 'Senior Full-Stack Engineer',
                      organization: 'Tech Studio Labs',
                      period: '2024 - Present',
                      type: 'Full-time',
                      location: 'Remote, Global',
                      description: 'Architecting scalable cloud microservices, performant frontend web apps and client systems.',
                      highlights: ['Led migration to high-performance React runtime', 'Mentored junior developers'],
                      techStack: ['React', 'Node.js', 'PostgreSQL']
                    };
                    addWorkEntry(newWork);
                    showToast('Added work entry!');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#3E60D5]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-4">
                {(data.workEntries || []).map((work) => (
                  <div
                    key={work.id}
                    className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-sm">{work.role}</h3>
                        <span className="text-xs text-[#3E60D5] font-semibold">@{work.organization}</span>
                      </div>
                      <p className="text-xs text-slate-400">{work.period} • {work.location} • {work.type}</p>
                      <p className="text-xs text-slate-300 mt-2">{work.description}</p>
                    </div>

                    <button
                      onClick={() => deleteWorkEntry(work.id)}
                      className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors shrink-0"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. CMS: BLOG ARTICLES */}
          {currentSection === 'cms-blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Blog & Articles ({(data.blogPosts || []).length})
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Publish and manage technical tutorials and engineering articles.</p>
                </div>
                <button
                  onClick={() => {
                    const newBlog: BlogPost = {
                      id: `blog-${Date.now()}`,
                      title: 'Architecting Scalable React & Node Solutions in 2026',
                      slug: `article-${Date.now()}`,
                      excerpt: 'A comprehensive guide to state architecture, edge rendering, and database synchronization.',
                      content: '# Overview\nBuilding modern web applications requires precision...',
                      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
                      tags: ['React', 'Architecture', 'TypeScript'],
                      publishedAt: 'September 2026',
                      readTime: '6 min read',
                      author: 'Bijaya Tamang',
                      isPublished: true,
                      views: 120
                    };
                    addBlogPost(newBlog);
                    showToast('Created blog article!');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#3E60D5]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write Article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {(data.blogPosts || []).map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                        <span>{post.publishedAt}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-white text-base">{post.title}</h3>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-2">{post.excerpt}</p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-[#272D3D] flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {post.views || 0} views • by {post.author}
                      </span>
                      <button
                        onClick={() => deleteBlogPost(post.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. CMS: GALLERY */}
          {currentSection === 'cms-gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Image & Visual Gallery ({(data.gallery || []).length})
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Curate high-resolution captures, UI prototypes and certificates.</p>
                </div>
                <button
                  onClick={() => {
                    const newItem: GalleryItem = {
                      id: `gal-${Date.now()}`,
                      title: 'Modern Architecture Prototype',
                      category: 'UI/UX Mockups',
                      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
                      highResUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1600&auto=format&fit=crop&q=90',
                      resolution: '3840x2160',
                      aspectRatio: '16:9',
                      description: 'Clean high-contrast responsive interface prototype design.',
                      date: '2026',
                      tags: ['UI', 'Prototype']
                    };
                    addGalleryItem(newItem);
                    showToast('Added gallery asset!');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#3E60D5]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Asset</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(data.gallery || []).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#1D212E] border border-[#272D3D] rounded-2xl overflow-hidden shadow-sm"
                  >
                    <div className="h-44 bg-[#161922] relative">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => deleteGalleryItem(item.id)}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-red-400 hover:bg-black/90 border border-white/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-3.5">
                      <h4 className="font-bold text-white text-xs">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. CMS: INQUIRIES & MESSAGES */}
          {currentSection === 'cms-messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Contact Inquiries ({data.messages.length})
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Review contact form submissions and convert high-intent messages to CRM leads.</p>
                </div>
              </div>

              <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm divide-y divide-[#272D3D]">
                {data.messages.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No contact messages received yet.
                  </div>
                ) : (
                  data.messages.map((msg) => (
                    <div key={msg.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{msg.name}</span>
                          <span className="text-xs text-slate-400 font-mono">({msg.email})</span>
                          {msg.status === 'unread' && (
                            <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#60A5FA]">{msg.subject}</p>
                        <p className="text-xs text-slate-300">{msg.message}</p>
                        <span className="text-[10px] text-slate-500">{msg.createdAt}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            convertMessageToLead(msg);
                            showToast(`Converted ${msg.name}'s inquiry to a CRM Lead!`);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#232A42] hover:bg-[#2e3757] text-[#3E60D5] border border-[#3E60D5]/40 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>Convert to Lead</span>
                        </button>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="p-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 8. CRM PIPELINE */}
          {currentSection === 'crm-pipeline' && <CRMSection />}

          {/* 9. ERP OPERATIONS */}
          {currentSection === 'erp-operations' && <ERPSection />}

          {/* 10. UI KIT SHOWCASES */}
          {currentSection.startsWith('uikit-') && (
            <TaploxUIKitView section={currentSection as any} />
          )}

          {/* 11. AUTH & ERROR PREVIEWS */}
          {(currentSection.startsWith('auth-') || currentSection.startsWith('error-')) && (
            <TaploxAuthPreviews
              view={currentSection as any}
              onNavigateHome={() => setCurrentSection('dashboard')}
            />
          )}

          {/* 12. SETTINGS: BACKUP & RESTORE */}
          {currentSection === 'settings-backup' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Database Backup & Sync</h1>
                <p className="text-xs text-slate-400 mt-1">Export, restore, or reset the full portfolio database schema.</p>
              </div>

              <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Export JSON Backup</h3>
                  <p className="text-xs text-slate-400 mb-3">Download a portable snapshot of all projects, history, leads and articles.</p>
                  <button
                    onClick={() => {
                      exportDataJson();
                      showToast('Exported database backup JSON file!');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Backup (.json)</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-[#272D3D]">
                  <h3 className="text-sm font-bold text-white mb-1">Restore Database from JSON</h3>
                  <p className="text-xs text-slate-400 mb-2">Paste valid backup JSON to restore state.</p>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder='Paste exported JSON structure here...'
                    className="w-full p-3 rounded-xl bg-[#161922] border border-[#272D3D] font-mono text-xs text-white"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => {
                        const success = importDataJson(importJsonText);
                        if (success) {
                          showToast('Database restored successfully!');
                          setImportJsonText('');
                        } else {
                          showToast('Invalid JSON structure. Please check and retry.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Restore JSON</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#272D3D] flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-red-400">Reset to Defaults</h3>
                    <p className="text-xs text-slate-400">Reset all portfolio content back to starter seed records.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all CMS, CRM and ERP data to starter defaults?')) {
                        resetToDefaults();
                        showToast('Reset back to starter defaults!');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-red-950/60 border border-red-800 text-red-400 hover:bg-red-900/60 text-xs font-bold"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Master Password / Admin Credentials Change Modal */}
      {isPasswordModalOpen && (
        <AdminPasswordChangeModal onClose={() => setIsPasswordModalOpen(false)} />
      )}

      {/* Toast Notification Notification Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-[#1D212E] border border-[#3E60D5] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
