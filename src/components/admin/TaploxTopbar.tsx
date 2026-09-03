import React, { useState, useMemo, useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  User,
  ShieldCheck,
  ExternalLink,
  LogOut,
  Database,
  CheckCircle2,
  AlertCircle,
  Mail,
  ChevronDown,
  CheckCheck,
  Trash2,
  X,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { TaploxNavSection } from './TaploxSidebar';

interface TaploxTopbarProps {
  onToggleSidebar: () => void;
  onSelectSection: (section: TaploxNavSection) => void;
  onOpenCredentials: () => void;
  onExitToSite: () => void;
  currentSection: TaploxNavSection;
}

const DISMISSED_NOTIFS_STORAGE_KEY = 'taplox_dismissed_notifications_v1';

export const TaploxTopbar: React.FC<TaploxTopbarProps> = ({
  onToggleSidebar,
  onSelectSection,
  onOpenCredentials,
  onExitToSite,
  currentSection
}) => {
  const {
    theme,
    toggleTheme,
    data,
    adminUsername,
    adminLogout,
    exportDataJson,
    markAllMessagesAsRead,
    markMessageStatus
  } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // References for outside click detection
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const notificationContainerRef = useRef<HTMLDivElement>(null);
  const userMenuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setIsSearchOpen(false);
      }
      if (notificationContainerRef.current && !notificationContainerRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuContainerRef.current && !userMenuContainerRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('touchstart', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Persistent dismissed/cleared notifications store
  const [dismissedIds, setDismissedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(DISMISSED_NOTIFS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveDismissedIds = (newIds: string[]) => {
    setDismissedIds(newIds);
    try {
      localStorage.setItem(DISMISSED_NOTIFS_STORAGE_KEY, JSON.stringify(newIds));
    } catch (e) {
      console.warn(e);
    }
  };

  // Real, Dynamic Notifications derived directly from live portfolio & admin state
  const rawNotifications = useMemo(() => {
    const notifs: Array<{
      id: string;
      title: string;
      desc: string;
      time: string;
      type: 'mail' | 'success' | 'info' | 'crm' | 'shield';
      targetSection?: TaploxNavSection;
      action?: () => void;
    }> = [];

    // 1. Unread Contact Messages / Inquiries
    const unreadMessages = (data.messages || []).filter((m) => m.status === 'unread');
    if (unreadMessages.length > 0) {
      const latestMsg = unreadMessages[0];
      notifs.push({
        id: `msg-${latestMsg.id}`,
        title: `New Inquiry (${unreadMessages.length} Unread)`,
        desc: `${latestMsg.name}: ${latestMsg.subject || latestMsg.message.slice(0, 45)}...`,
        time: latestMsg.createdAt ? new Date(latestMsg.createdAt).toLocaleDateString() : 'Recent',
        type: 'mail',
        targetSection: 'cms-messages',
        action: () => markMessageStatus(latestMsg.id, 'read')
      });
    }

    // 2. Real Invoices & Pending Billing
    if (data.invoices && data.invoices.length > 0) {
      const pendingInvoices = data.invoices.filter((inv) => inv.status === 'pending' || inv.status === 'overdue');
      const latestInv = pendingInvoices[0] || data.invoices[0];
      notifs.push({
        id: `inv-${latestInv.id}-${latestInv.status}`,
        title: pendingInvoices.length > 0 ? `Pending Billing (${pendingInvoices.length} Invoices)` : 'Invoice Status Update',
        desc: `${latestInv.invoiceNumber} for ${latestInv.clientName} (${latestInv.status.toUpperCase()} - $${latestInv.totalAmount.toLocaleString()})`,
        time: latestInv.issueDate || 'Today',
        type: 'success',
        targetSection: 'erp-operations'
      });
    }

    // 3. Active CRM Leads Pipeline
    if (data.leads && data.leads.length > 0) {
      const activeLeads = data.leads.filter((l) => l.stage !== 'won' && l.stage !== 'lost');
      const totalPipelineVal = activeLeads.reduce((s, l) => s + (Number(l.estimatedValue) || 0), 0);
      if (activeLeads.length > 0) {
        notifs.push({
          id: `crm-leads-${activeLeads.length}-${totalPipelineVal}`,
          title: 'Active CRM Pipeline',
          desc: `${activeLeads.length} active opportunities tracked • Value: $${totalPipelineVal.toLocaleString()}`,
          time: 'Live',
          type: 'crm',
          targetSection: 'crm-pipeline'
        });
      }
    }

    // 4. ERP In-Progress Projects & Milestones
    if (data.erpProjects && data.erpProjects.length > 0) {
      const inProgressProjects = data.erpProjects.filter((p) => p.status === 'in-progress' || p.status === 'planning');
      if (inProgressProjects.length > 0) {
        const topProject = inProgressProjects[0];
        notifs.push({
          id: `erp-${topProject.id}-${topProject.progressPercent}`,
          title: 'ERP Project In Progress',
          desc: `${topProject.title} (${topProject.progressPercent}% complete)`,
          time: 'Active',
          type: 'info',
          targetSection: 'erp-operations'
        });
      }
    }

    // 5. Active Master Administrator Session
    notifs.push({
      id: 'notif-admin-session',
      title: 'Admin Session Active',
      desc: `Logged in as Master Administrator (@${adminUsername})`,
      time: 'Now',
      type: 'shield',
      targetSection: 'cms-profile'
    });

    return notifs;
  }, [data.messages, data.invoices, data.leads, data.erpProjects, adminUsername, markMessageStatus]);

  // Filter out any dismissed notification IDs
  const activeNotifications = useMemo(() => {
    return rawNotifications.filter((n) => !dismissedIds.includes(n.id));
  }, [rawNotifications, dismissedIds]);

  const unreadCount = activeNotifications.length;

  // Clear all / Mark as Read Handler
  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 1. Mark all real unread messages as read in central state
    markAllMessagesAsRead();
    // 2. Mark all current notification IDs as dismissed
    const allIds = rawNotifications.map((n) => n.id);
    saveDismissedIds(Array.from(new Set([...dismissedIds, ...allIds])));
  };

  // Single notification dismissal
  const handleDismissSingle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    saveDismissedIds([...dismissedIds, id]);
  };

  // Click on a notification to navigate and clear
  const handleNotificationClick = (n: (typeof rawNotifications)[0]) => {
    if (n.action) n.action();
    saveDismissedIds([...dismissedIds, n.id]);
    if (n.targetSection) {
      onSelectSection(n.targetSection);
      setIsNotificationsOpen(false);
    }
  };

  // Restore notifications
  const handleRestore = (e: React.MouseEvent) => {
    e.stopPropagation();
    saveDismissedIds([]);
  };

  return (
    <header className="h-16 bg-[#161922] border-b border-[#222736] px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
      {/* Left controls: Hamburger + Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          id="taplox-sidebar-toggle-btn"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E2230] transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div ref={searchContainerRef} className="relative w-full max-w-xs sm:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="taplox-global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="admin,widgets..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1D212E] border border-[#272D3D] focus:border-[#3E60D5] focus:bg-[#1A1E2B] focus:outline-none text-slate-200 text-xs placeholder:text-slate-500 transition-all font-sans"
          />

          {/* Quick search popup */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-[#1A1E2B] border border-[#272D3D] rounded-2xl shadow-2xl p-2 z-50 text-xs space-y-1">
              <div className="px-2 py-1 text-[10px] text-slate-400 font-bold uppercase">Quick Navigation</div>
              <button
                onClick={() => {
                  onSelectSection('dashboard');
                  setIsSearchOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#232A42] text-slate-200 hover:text-[#3E60D5] flex items-center justify-between"
              >
                <span>Dashboard & Analytics</span>
                <span className="text-[10px] text-slate-500">Overview</span>
              </button>
              <button
                onClick={() => {
                  onSelectSection('cms-projects');
                  setIsSearchOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#232A42] text-slate-200 hover:text-[#3E60D5] flex items-center justify-between"
              >
                <span>Projects Portfolio ({data.projects.length})</span>
                <span className="text-[10px] text-slate-500">CMS</span>
              </button>
              <button
                onClick={() => {
                  onSelectSection('cms-skills');
                  setIsSearchOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#232A42] text-slate-200 hover:text-[#3E60D5] flex items-center justify-between"
              >
                <span>Skills & Technical Arsenal ({data.skillCategories.length})</span>
                <span className="text-[10px] text-slate-500">Skills</span>
              </button>
              <button
                onClick={() => {
                  onSelectSection('crm-pipeline');
                  setIsSearchOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#232A42] text-slate-200 hover:text-[#3E60D5] flex items-center justify-between"
              >
                <span>CRM Leads & Pipeline ({data.leads.length})</span>
                <span className="text-[10px] text-slate-500">Sales</span>
              </button>
              <button
                onClick={() => {
                  onSelectSection('erp-operations');
                  setIsSearchOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#232A42] text-slate-200 hover:text-[#3E60D5] flex items-center justify-between"
              >
                <span>ERP Operations & Invoices</span>
                <span className="text-[10px] text-slate-500">Finance</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right controls: Theme, Notifications, Admin Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme mode toggle */}
        <button
          id="taplox-theme-toggle"
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-[#1E2230] transition-colors cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Notifications Bell */}
        <div ref={notificationContainerRef} className="relative">
          <button
            id="taplox-notification-btn"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E2230] transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span
                id="taplox-unread-notifs-badge"
                className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#161922] shadow-sm"
              >
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div
              id="taplox-notifications-dropdown"
              className="absolute right-0 top-full mt-2 w-84 sm:w-96 bg-[#1A1E2B] border border-[#272D3D] rounded-2xl shadow-2xl p-3 z-50 text-xs"
            >
              {/* Header with Title, Badge, and Clear All / Mark as read CTA */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#272D3D]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">Notifications</span>
                  {unreadCount > 0 ? (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#3E60D5]/20 text-[#688AF5] border border-[#3E60D5]/30">
                      {unreadCount} New
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      All Caught Up
                    </span>
                  )}
                </div>

                {unreadCount > 0 ? (
                  <button
                    id="taplox-clear-all-notifs-btn"
                    onClick={handleClearAll}
                    className="text-[11px] font-semibold text-[#3E60D5] hover:text-[#5B7FF2] hover:bg-[#232A42] px-2 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Mark all notifications as read and clear"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark as read</span>
                  </button>
                ) : (
                  <button
                    id="taplox-restore-notifs-btn"
                    onClick={handleRestore}
                    className="text-[10px] text-slate-400 hover:text-slate-200 hover:bg-[#232A42] px-1.5 py-0.5 rounded transition-all flex items-center gap-1 cursor-pointer"
                    title="Restore past activity notifications"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restore</span>
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                {activeNotifications.length > 0 ? (
                  activeNotifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className="p-2.5 rounded-xl bg-[#161922] hover:bg-[#202538] border border-transparent hover:border-[#272D3D] transition-all flex items-start gap-3 cursor-pointer group relative"
                    >
                      <div className="p-2 rounded-lg bg-[#272D3D] text-[#3E60D5] shrink-0 mt-0.5 shadow-sm">
                        {n.type === 'mail' && <Mail className="w-3.5 h-3.5 text-blue-400" />}
                        {n.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        {n.type === 'info' && <Bell className="w-3.5 h-3.5 text-amber-400" />}
                        {n.type === 'crm' && <User className="w-3.5 h-3.5 text-purple-400" />}
                        {n.type === 'shield' && <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />}
                      </div>

                      <div className="flex-1 min-w-0 pr-5">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <p className="text-xs font-semibold text-slate-100 group-hover:text-[#688AF5] transition-colors truncate">
                            {n.title}
                          </p>
                          <span className="text-[9px] text-slate-500 font-mono shrink-0">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate leading-snug">{n.desc}</p>
                      </div>

                      {/* Individual Dismiss Button */}
                      <button
                        onClick={(e) => handleDismissSingle(e, n.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-[#272D3D] transition-all absolute top-2 right-2 cursor-pointer"
                        title="Dismiss notification"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2.5">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-200">No New Notifications</p>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-[220px]">
                      You're all caught up with your CRM leads, invoices, messages, and projects.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Admin User Menu Dropdown */}
        <div ref={userMenuContainerRef} className="relative">
          <button
            id="taplox-user-menu-btn"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#1E2230] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3E60D5] to-[#727CF5] flex items-center justify-center font-bold text-white text-xs ring-2 ring-[#3E60D5]/40 shadow-sm">
              BT
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-white leading-tight">Bijaya Tamang</p>
              <p className="text-[10px] text-slate-400">@{adminUsername}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#1A1E2B] border border-[#272D3D] rounded-2xl shadow-2xl p-2 z-50 text-xs space-y-1">
              <div className="px-3 py-2 border-b border-[#272D3D]">
                <p className="font-semibold text-white">Bijaya Tamang</p>
                <p className="text-[10px] text-emerald-400 font-mono">Master Administrator</p>
              </div>

              <button
                onClick={() => {
                  onSelectSection('cms-profile');
                  setIsUserMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#202538] flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#3E60D5]" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={() => {
                  onOpenCredentials();
                  setIsUserMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#202538] flex items-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A29]" />
                <span>Change Credentials</span>
              </button>

              <button
                onClick={() => {
                  exportDataJson();
                  setIsUserMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#202538] flex items-center gap-2"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export DB Backup</span>
              </button>

              <div className="border-t border-[#272D3D] my-1" />

              <button
                onClick={onExitToSite}
                className="w-full text-left px-3 py-2 rounded-xl text-indigo-400 hover:text-indigo-300 hover:bg-[#202538] flex items-center gap-2 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Exit to Live Portfolio</span>
              </button>

              <button
                onClick={() => {
                  adminLogout();
                  onExitToSite();
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
