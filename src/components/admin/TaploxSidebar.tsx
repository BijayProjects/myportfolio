import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Logo } from '../Logo';
import {
  LayoutDashboard,
  Lock,
  AlertTriangle,
  Component,
  BarChart2,
  FileText,
  Table,
  Sparkles,
  MapPin,
  Layers,
  List,
  Slash,
  User,
  FolderGit2,
  Briefcase,
  BookOpen,
  Image,
  Mail,
  Users,
  FolderKanban,
  Settings,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Hexagon,
  LogOut,
  Database,
  Sliders
} from 'lucide-react';

export type TaploxNavSection =
  | 'dashboard'
  // Auth Previews
  | 'auth-signin'
  | 'auth-signup'
  | 'auth-reset'
  | 'auth-lock'
  // Error Pages
  | 'error-404'
  | 'error-500'
  // CMS & Portfolio
  | 'cms-profile'
  | 'cms-sections'
  | 'cms-projects'
  | 'cms-work'
  | 'cms-blog'
  | 'cms-gallery'
  | 'cms-skills'
  | 'cms-messages'
  | 'crm-pipeline'
  | 'erp-operations'
  // UI Kit
  | 'uikit-base'
  | 'uikit-charts'
  | 'uikit-forms'
  | 'uikit-tables'
  | 'uikit-icons'
  | 'uikit-maps'
  // Settings
  | 'settings-credentials'
  | 'settings-backup';

interface TaploxSidebarProps {
  currentSection: TaploxNavSection;
  onSelectSection: (section: TaploxNavSection) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onExitToSite: () => void;
  onOpenCredentials: () => void;
}

export const TaploxSidebar: React.FC<TaploxSidebarProps> = ({
  currentSection,
  onSelectSection,
  collapsed,
  onExitToSite,
  onOpenCredentials
}) => {
  const { data, adminLogout } = usePortfolio();

  // Collapsible groups
  const [authExpanded, setAuthExpanded] = useState(false);
  const [errorExpanded, setErrorExpanded] = useState(false);
  const [cmsExpanded, setCmsExpanded] = useState(true);
  const [uikitExpanded, setUikitExpanded] = useState(false);

  const unreadCount = data.messages.filter((m) => m.status === 'unread').length;

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-[#161922] border-r border-[#222736] flex flex-col transition-all duration-300 shrink-0 z-30 select-none`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-[#222736] gap-2.5 overflow-hidden">
        <div className="shrink-0 flex items-center justify-center">
          <Logo size="sm" showSubtitle={false} animated={false} />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold tracking-tight text-white font-sans flex items-center gap-1.5 leading-tight truncate">
              <span className="text-indigo-400 font-extrabold">Bijaya</span>
              <span className="text-[#FF7A29] font-extrabold">Tamang</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#3E60D5]/30 text-[#688AF5] font-normal border border-[#3E60D5]/40 font-mono">
                Admin
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              Full-Stack Developer
            </span>
          </div>
        )}
      </div>

      {/* Navigation Scrollable Area */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar text-xs">
        {/* SECTION: MENU */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              MENU...
            </div>
          )}

          <div className="space-y-1">
            {/* Dashboard */}
            <button
              onClick={() => onSelectSection('dashboard')}
              title={collapsed ? 'Dashboard' : undefined}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                currentSection === 'dashboard'
                  ? 'bg-[#232A42] text-[#3E60D5] font-semibold border-l-2 border-[#3E60D5]'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-[#1E2230]'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className={`w-4 h-4 ${currentSection === 'dashboard' ? 'text-[#3E60D5]' : 'text-slate-400'}`} />
                {!collapsed && <span>Dashboard</span>}
              </div>
              {!collapsed && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#3E60D5] text-white">
                  New
                </span>
              )}
            </button>

            {/* Authentication Dropdown */}
            <div>
              <button
                onClick={() => setAuthExpanded(!authExpanded)}
                title={collapsed ? 'Authentication' : undefined}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  currentSection.startsWith('auth-')
                    ? 'text-slate-100 bg-[#1E2230]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>Authentication</span>}
                </div>
                {!collapsed && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      authExpanded ? 'rotate-180 text-slate-300' : 'text-slate-500'
                    }`}
                  />
                )}
              </button>

              {authExpanded && !collapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 text-slate-400">
                  <button
                    onClick={() => onSelectSection('auth-signin')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      currentSection === 'auth-signin' ? 'text-[#3E60D5] font-semibold' : 'hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => onSelectSection('auth-signup')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      currentSection === 'auth-signup' ? 'text-[#3E60D5] font-semibold' : 'hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => onSelectSection('auth-reset')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      currentSection === 'auth-reset' ? 'text-[#3E60D5] font-semibold' : 'hover:text-white'
                    }`}
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => onSelectSection('auth-lock')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      currentSection === 'auth-lock' ? 'text-[#3E60D5] font-semibold' : 'hover:text-white'
                    }`}
                  >
                    Lock Screen
                  </button>
                </div>
              )}
            </div>

            {/* Error Pages Dropdown */}
            <div>
              <button
                onClick={() => setErrorExpanded(!errorExpanded)}
                title={collapsed ? 'Error Pages' : undefined}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  currentSection.startsWith('error-')
                    ? 'text-slate-100 bg-[#1E2230]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>Error Pages</span>}
                </div>
                {!collapsed && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      errorExpanded ? 'rotate-180 text-slate-300' : 'text-slate-500'
                    }`}
                  />
                )}
              </button>

              {errorExpanded && !collapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 text-slate-400">
                  <button
                    onClick={() => onSelectSection('error-404')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      currentSection === 'error-404' ? 'text-[#3E60D5] font-semibold' : 'hover:text-white'
                    }`}
                  >
                    404 Error
                  </button>
                  <button
                    onClick={() => onSelectSection('error-500')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      currentSection === 'error-500' ? 'text-[#3E60D5] font-semibold' : 'hover:text-white'
                    }`}
                  >
                    500 Server Error
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION: PORTFOLIO & CMS */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>CMS & CRM...</span>
              <button
                onClick={() => setCmsExpanded(!cmsExpanded)}
                className="text-slate-500 hover:text-slate-300"
              >
                {cmsExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            </div>
          )}

          {(!collapsed ? cmsExpanded : true) && (
            <div className="space-y-1">
              <button
                onClick={() => onSelectSection('cms-profile')}
                title={collapsed ? 'Profile & Bio' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'cms-profile'
                    ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <User className="w-4 h-4 text-slate-400" />
                {!collapsed && <span>Profile & Bio</span>}
              </button>

              <button
                onClick={() => onSelectSection('cms-sections')}
                title={collapsed ? 'Sections & Animations' : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'cms-sections'
                    ? 'bg-[#232A42] text-[#FF7A29] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sliders className={`w-4 h-4 ${currentSection === 'cms-sections' ? 'text-[#FF7A29]' : 'text-slate-400'}`} />
                  {!collapsed && <span>Section Headings & FX</span>}
                </div>
                {!collapsed && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#FF7A29]/20 text-[#FF7A29] font-mono font-semibold">
                    NEW
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectSection('cms-projects')}
                title={collapsed ? `Projects (${(data.projects || []).length})` : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'cms-projects'
                    ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>Projects</span>}
                </div>
                {!collapsed && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#202538] text-slate-300">
                    {(data.projects || []).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectSection('cms-work')}
                title={collapsed ? `Work Experience (${(data.workEntries || []).length})` : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'cms-work'
                    ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>Work History</span>}
                </div>
                {!collapsed && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#202538] text-slate-300">
                    {(data.workEntries || []).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectSection('cms-blog')}
                title={collapsed ? `Articles (${(data.blogPosts || []).length})` : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'cms-blog'
                    ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>Blog Articles</span>}
                </div>
                {!collapsed && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#202538] text-slate-300">
                    {(data.blogPosts || []).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectSection('cms-gallery')}
                title={collapsed ? `Gallery (${(data.gallery || []).length})` : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'cms-gallery'
                    ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Image className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>Image Gallery</span>}
                </div>
                {!collapsed && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#202538] text-slate-300">
                    {(data.gallery || []).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectSection('cms-skills')}
                title={collapsed ? `Skills & Arsenal (${(data.skillCategories || []).length})` : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'cms-skills'
                    ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#FF7A29]" />
                  {!collapsed && <span>Skills & Arsenal</span>}
                </div>
                {!collapsed && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#202538] text-slate-300">
                    {(data.skillCategories || []).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectSection('cms-messages')}
                title={collapsed ? `Inquiries (${(data.messages || []).length})` : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'cms-messages'
                    ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>Inquiries</span>}
                </div>
                {unreadCount > 0 && !collapsed && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectSection('crm-pipeline')}
                title={collapsed ? `CRM Pipeline (${(data.leads || []).length})` : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'crm-pipeline'
                    ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>CRM & Leads</span>}
                </div>
                {!collapsed && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#202538] text-slate-300">
                    {(data.leads || []).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectSection('erp-operations')}
                title={collapsed ? `ERP Operations (${(data.erpProjects || []).length})` : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                  currentSection === 'erp-operations'
                    ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>ERP & Orders</span>}
                </div>
                {!collapsed && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#202538] text-slate-300">
                    {(data.erpProjects || []).length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* SECTION: UI KIT */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              UI KIT...
            </div>
          )}

          <div className="space-y-1">
            <button
              onClick={() => onSelectSection('uikit-base')}
              title={collapsed ? 'Base UI' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                currentSection === 'uikit-base'
                  ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
              }`}
            >
              <Component className="w-4 h-4 text-slate-400" />
              {!collapsed && <span>Base UI</span>}
            </button>

            <button
              onClick={() => onSelectSection('uikit-charts')}
              title={collapsed ? 'Apex Charts' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                currentSection === 'uikit-charts'
                  ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-slate-400" />
              {!collapsed && <span>Apex Charts</span>}
            </button>

            <button
              onClick={() => onSelectSection('uikit-forms')}
              title={collapsed ? 'Forms' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                currentSection === 'uikit-forms'
                  ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-400" />
              {!collapsed && <span>Forms</span>}
            </button>

            <button
              onClick={() => onSelectSection('uikit-tables')}
              title={collapsed ? 'Tables' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                currentSection === 'uikit-tables'
                  ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
              }`}
            >
              <Table className="w-4 h-4 text-slate-400" />
              {!collapsed && <span>Tables</span>}
            </button>

            <button
              onClick={() => onSelectSection('uikit-icons')}
              title={collapsed ? 'Icons' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                currentSection === 'uikit-icons'
                  ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-slate-400" />
              {!collapsed && <span>Icons</span>}
            </button>

            <button
              onClick={() => onSelectSection('uikit-maps')}
              title={collapsed ? 'Maps' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                currentSection === 'uikit-maps'
                  ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
              }`}
            >
              <MapPin className="w-4 h-4 text-slate-400" />
              {!collapsed && <span>Maps</span>}
            </button>
          </div>
        </div>

        {/* SECTION: OTHER & SYSTEM */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              OTHER...
            </div>
          )}

          <div className="space-y-1">
            <button
              onClick={onOpenCredentials}
              title={collapsed ? 'Credentials' : undefined}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E2230] transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#FF7A29]" />
              {!collapsed && <span>Admin Credentials</span>}
            </button>

            <button
              onClick={() => onSelectSection('settings-backup')}
              title={collapsed ? 'Backup / Restore' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                currentSection === 'settings-backup'
                  ? 'bg-[#232A42] text-[#3E60D5] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-[#1E2230]'
              }`}
            >
              <Database className="w-4 h-4 text-slate-400" />
              {!collapsed && <span>Backup & Restore</span>}
            </button>

            <button
              onClick={onExitToSite}
              title={collapsed ? 'View Portfolio' : undefined}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-indigo-400 hover:text-indigo-300 hover:bg-[#1E2230] transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4 text-indigo-400" />
              {!collapsed && <span>Exit to Public Site</span>}
            </button>
          </div>
        </div>
      </div>

      {/* User Status Bar at bottom of sidebar */}
      <div className="p-3 border-t border-[#222736] bg-[#13161F] flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3E60D5] to-[#727CF5] flex items-center justify-center font-bold text-white text-xs shrink-0">
            BT
          </div>
          {!collapsed && (
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">Bijaya Tamang</p>
              <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Admin
              </p>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => {
              adminLogout();
              onExitToSite();
            }}
            title="Logout"
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
