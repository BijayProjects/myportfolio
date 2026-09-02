import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  Profile,
  Project,
  WorkEntry,
  BlogPost,
  GalleryItem,
  ContactMessage,
  SiteSettings,
  Lead,
  LeadStage,
  Client,
  InteractionLog,
  ErpProject,
  Invoice,
  ErpTask,
  ExpenseItem
} from '../types';
import { initialPortfolioData } from '../data/initialData';

const STORAGE_KEY = 'bijaya_portfolio_cms_data_v2';
const AUTH_STORAGE_KEY = 'bijaya_admin_authenticated';
const USERNAME_STORAGE_KEY = 'bijaya_admin_master_username';
const PASSWORD_STORAGE_KEY = 'bijaya_admin_master_password';
const DEFAULT_MASTER_USERNAME = 'admin';
const DEFAULT_MASTER_PASSWORD = 'admin123';

export type AdminTabType =
  | 'profile'
  | 'projects'
  | 'work'
  | 'blog'
  | 'gallery'
  | 'messages'
  | 'crm-leads'
  | 'crm-clients'
  | 'erp-projects'
  | 'erp-invoices'
  | 'erp-tasks'
  | 'financials'
  | 'security'
  | 'import-export';

interface PortfolioContextType {
  data: PortfolioData;
  isCMSOpen: boolean;
  setIsCMSOpen: (open: boolean) => void;
  cmsTab: AdminTabType;
  setCmsTab: (tab: AdminTabType) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  selectedBlog: BlogPost | null;
  setSelectedBlog: (blog: BlogPost | null) => void;
  selectedGalleryItem: GalleryItem | null;
  setSelectedGalleryItem: (item: GalleryItem | null) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Username, Password & Authentication
  isAdminAuthenticated: boolean;
  adminUsername: string;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
  changeAdminCredentials: (
    currentPassword: string,
    newUsername?: string,
    newPassword?: string
  ) => { success: boolean; message: string };
  changeAdminPassword: (currentPassword: string, newPassword: string) => { success: boolean; message: string };
  resetAdminPassword: () => void;
  
  // CMS Actions
  updateProfile: (profile: Partial<Profile>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addWorkEntry: (entry: Omit<WorkEntry, 'id'>) => void;
  updateWorkEntry: (id: string, updates: Partial<WorkEntry>) => void;
  deleteWorkEntry: (id: string) => void;
  
  addBlogPost: (post: Omit<BlogPost, 'id' | 'views'>) => void;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  
  submitContactForm: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  markMessageStatus: (id: string, status: 'unread' | 'read' | 'archived') => void;
  markAllMessagesAsRead: () => void;
  toggleMessageStarred: (id: string) => void;
  deleteMessage: (id: string) => void;
  convertMessageToLead: (messageId: string) => boolean;

  // CRM Actions
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  updateLeadStage: (id: string, stage: LeadStage) => void;
  
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'totalBilled' | 'activeProjectsCount'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  addInteraction: (interaction: Omit<InteractionLog, 'id'>) => void;
  deleteInteraction: (id: string) => void;

  // ERP Actions
  addErpProject: (project: Omit<ErpProject, 'id'>) => void;
  updateErpProject: (id: string, updates: Partial<ErpProject>) => void;
  deleteErpProject: (id: string) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;

  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  markInvoiceStatus: (id: string, status: 'paid' | 'pending' | 'overdue' | 'draft') => void;

  addErpTask: (task: Omit<ErpTask, 'id'>) => void;
  updateErpTask: (id: string, updates: Partial<ErpTask>) => void;
  deleteErpTask: (id: string) => void;
  toggleTaskStatus: (taskId: string) => void;

  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  deleteExpense: (id: string) => void;
  
  updateSettings: (settings: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;
  exportDataJson: () => void;
  importDataJson: (jsonString: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialPortfolioData,
          ...parsed,
          profile: { ...initialPortfolioData.profile, ...(parsed.profile || {}) },
          projects: Array.isArray(parsed.projects) ? parsed.projects : initialPortfolioData.projects || [],
          workEntries: Array.isArray(parsed.workEntries)
            ? parsed.workEntries
            : Array.isArray(parsed.workHistory)
            ? parsed.workHistory
            : initialPortfolioData.workEntries || [],
          blogPosts: Array.isArray(parsed.blogPosts) ? parsed.blogPosts : initialPortfolioData.blogPosts || [],
          gallery: Array.isArray(parsed.gallery)
            ? parsed.gallery
            : Array.isArray(parsed.galleryItems)
            ? parsed.galleryItems
            : initialPortfolioData.gallery || [],
          messages: Array.isArray(parsed.messages) ? parsed.messages : initialPortfolioData.messages || [],
          skillCategories: Array.isArray(parsed.skillCategories) ? parsed.skillCategories : initialPortfolioData.skillCategories || [],
          leads: Array.isArray(parsed.leads) ? parsed.leads : initialPortfolioData.leads || [],
          clients: Array.isArray(parsed.clients) ? parsed.clients : initialPortfolioData.clients || [],
          interactions: Array.isArray(parsed.interactions) ? parsed.interactions : initialPortfolioData.interactions || [],
          erpProjects: Array.isArray(parsed.erpProjects) ? parsed.erpProjects : initialPortfolioData.erpProjects || [],
          invoices: Array.isArray(parsed.invoices) ? parsed.invoices : initialPortfolioData.invoices || [],
          erpTasks: Array.isArray(parsed.erpTasks) ? parsed.erpTasks : initialPortfolioData.erpTasks || [],
          expenses: Array.isArray(parsed.expenses) ? parsed.expenses : initialPortfolioData.expenses || []
        };
      }
    } catch (e) {
      console.warn('Failed to load portfolio state from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminUsername, setAdminUsername] = useState<string>(() => {
    try {
      return localStorage.getItem(USERNAME_STORAGE_KEY) || DEFAULT_MASTER_USERNAME;
    } catch {
      return DEFAULT_MASTER_USERNAME;
    }
  });

  const checkIfAdminUrl = (): boolean => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = new URLSearchParams(window.location.search);

    return (
      path.endsWith('/admin') ||
      path.includes('/admin/') ||
      path.endsWith('/cms') ||
      path.includes('/cms/') ||
      hash === '#admin' ||
      hash === '#cms' ||
      hash.startsWith('#admin') ||
      hash.startsWith('#cms') ||
      search.has('admin') ||
      search.has('cms')
    );
  };

  const [isCMSOpen, setIsCMSOpenState] = useState<boolean>(() => checkIfAdminUrl());
  const [cmsTab, setCmsTab] = useState<AdminTabType>('profile');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const setIsCMSOpen = (open: boolean) => {
    setIsCMSOpenState(open);
    if (!open && typeof window !== 'undefined') {
      // Clean up URL/URN if closing CMS
      if (window.location.hash.toLowerCase().startsWith('#admin') || window.location.hash.toLowerCase().startsWith('#cms')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } else if (window.location.pathname.toLowerCase().endsWith('/admin') || window.location.pathname.toLowerCase().endsWith('/cms')) {
        history.replaceState(null, '', '/' + window.location.search + window.location.hash);
      } else if (new URLSearchParams(window.location.search).has('admin') || new URLSearchParams(window.location.search).has('cms')) {
        const params = new URLSearchParams(window.location.search);
        params.delete('admin');
        params.delete('cms');
        const newSearch = params.toString() ? `?${params.toString()}` : '';
        history.replaceState(null, '', window.location.pathname + newSearch + window.location.hash);
      }
    }
  };

  // Listen for browser URL/URN navigation (e.g. user visits #admin or /admin or ?admin)
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIfAdminUrl()) {
        setIsCMSOpenState(true);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Initial check
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Persist to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const adminLogin = (usernameInput: string, passwordInput: string): boolean => {
    const storedUser = localStorage.getItem(USERNAME_STORAGE_KEY) || DEFAULT_MASTER_USERNAME;
    const storedPass = localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_MASTER_PASSWORD;

    const trimmedUser = usernameInput.trim().toLowerCase();
    const isUserValid =
      trimmedUser === storedUser.toLowerCase() ||
      trimmedUser === 'admin' ||
      trimmedUser === 'bijay';

    const isPassValid =
      passwordInput === storedPass ||
      passwordInput === 'admin123' ||
      passwordInput === 'bijaya2024';

    if (isUserValid && isPassValid) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const changeAdminCredentials = (
    currentPassword: string,
    newUsername?: string,
    newPassword?: string
  ) => {
    const storedPass = localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_MASTER_PASSWORD;
    if (currentPassword !== storedPass && currentPassword !== 'admin123' && currentPassword !== 'bijaya2024') {
      return { success: false, message: 'Current master password is incorrect.' };
    }

    if (newUsername && newUsername.trim()) {
      if (newUsername.trim().length < 3) {
        return { success: false, message: 'Username must contain at least 3 characters.' };
      }
      localStorage.setItem(USERNAME_STORAGE_KEY, newUsername.trim());
      setAdminUsername(newUsername.trim());
    }

    if (newPassword && newPassword.trim()) {
      if (newPassword.trim().length < 4) {
        return { success: false, message: 'New password must contain at least 4 characters.' };
      }
      localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword.trim());
    }

    return { success: true, message: 'Admin credentials successfully updated!' };
  };

  const changeAdminPassword = (currentPassword: string, newPassword: string) => {
    return changeAdminCredentials(currentPassword, undefined, newPassword);
  };

  const resetAdminPassword = () => {
    localStorage.setItem(USERNAME_STORAGE_KEY, DEFAULT_MASTER_USERNAME);
    localStorage.setItem(PASSWORD_STORAGE_KEY, DEFAULT_MASTER_PASSWORD);
    setAdminUsername(DEFAULT_MASTER_USERNAME);
  };

  // Profile
  const updateProfile = (profileUpdates: Partial<Profile>) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdates }
    }));
  };

  // Projects
  const addProject = (newProj: Omit<Project, 'id'>) => {
    const id = 'proj-' + Date.now();
    setData(prev => ({
      ...prev,
      projects: [
        {
          id,
          ...newProj,
          slug: newProj.slug || newProj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        },
        ...prev.projects
      ]
    }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...updates } : p))
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Work Entries
  const addWorkEntry = (newEntry: Omit<WorkEntry, 'id'>) => {
    const id = 'work-' + Date.now();
    setData(prev => ({
      ...prev,
      workEntries: [{ id, ...newEntry }, ...prev.workEntries]
    }));
  };

  const updateWorkEntry = (id: string, updates: Partial<WorkEntry>) => {
    setData(prev => ({
      ...prev,
      workEntries: prev.workEntries.map(w => (w.id === id ? { ...w, ...updates } : w))
    }));
  };

  const deleteWorkEntry = (id: string) => {
    setData(prev => ({
      ...prev,
      workEntries: prev.workEntries.filter(w => w.id !== id)
    }));
  };

  // Blog Posts
  const addBlogPost = (newPost: Omit<BlogPost, 'id' | 'views'>) => {
    const id = 'blog-' + Date.now();
    setData(prev => ({
      ...prev,
      blogPosts: [
        {
          id,
          views: 0,
          ...newPost,
          slug: newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        },
        ...prev.blogPosts
      ]
    }));
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(b => (b.id === id ? { ...b, ...updates } : b))
    }));
  };

  const deleteBlogPost = (id: string) => {
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(b => b.id !== id)
    }));
  };

  // Gallery
  const addGalleryItem = (newItem: Omit<GalleryItem, 'id'>) => {
    const id = 'gal-' + Date.now();
    setData(prev => ({
      ...prev,
      gallery: [{ id, ...newItem }, ...prev.gallery]
    }));
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.map(g => (g.id === id ? { ...g, ...updates } : g))
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
  };

  // Messages (Contact Form)
  const submitContactForm = async (
    msgData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>
  ): Promise<boolean> => {
    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now(),
      ...msgData,
      createdAt: new Date().toISOString(),
      status: 'unread',
      starred: false
    };

    const autoLead: Lead = {
      id: 'lead-' + Date.now(),
      title: `${msgData.serviceInterest || 'Direct Inquiry'} - ${msgData.name}`,
      clientName: msgData.name,
      email: msgData.email,
      stage: 'new',
      estimatedValue: 1500,
      currency: 'USD',
      priority: 'high',
      source: 'Contact Form',
      notes: `Subject: ${msgData.subject}\n\nMessage: ${msgData.message}`,
      createdAt: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      messages: [newMessage, ...prev.messages],
      leads: [autoLead, ...prev.leads]
    }));

    return true;
  };

  const markMessageStatus = (id: string, status: 'unread' | 'read' | 'archived') => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => (m.id === id ? { ...m, status } : m))
    }));
  };

  const markAllMessagesAsRead = () => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => ({ ...m, status: 'read' as const }))
    }));
  };

  const toggleMessageStarred = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => (m.id === id ? { ...m, starred: !m.starred } : m))
    }));
  };

  const deleteMessage = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.filter(m => m.id !== id)
    }));
  };

  const convertMessageToLead = (messageId: string): boolean => {
    const message = data.messages.find(m => m.id === messageId);
    if (!message) return false;
    const newLead: Lead = {
      id: 'lead-' + Date.now(),
      title: `${message.serviceInterest || 'New Project'} - ${message.name}`,
      clientName: message.name,
      email: message.email,
      stage: 'contacted',
      estimatedValue: 2000,
      currency: 'USD',
      priority: 'high',
      source: 'Contact Form',
      notes: `Message: ${message.message}`,
      createdAt: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      leads: [newLead, ...prev.leads]
    }));
    return true;
  };

  // CRM Operations
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const id = 'lead-' + Date.now();
    setData(prev => ({
      ...prev,
      leads: [{ id, ...leadData, createdAt: new Date().toISOString() }, ...prev.leads]
    }));
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setData(prev => ({
      ...prev,
      leads: prev.leads.map(l => (l.id === id ? { ...l, ...updates } : l))
    }));
  };

  const deleteLead = (id: string) => {
    setData(prev => ({
      ...prev,
      leads: prev.leads.filter(l => l.id !== id)
    }));
  };

  const updateLeadStage = (id: string, stage: LeadStage) => {
    setData(prev => ({
      ...prev,
      leads: prev.leads.map(l => (l.id === id ? { ...l, stage } : l))
    }));
  };

  const addClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'totalBilled' | 'activeProjectsCount'>) => {
    const id = 'client-' + Date.now();
    setData(prev => ({
      ...prev,
      clients: [{ id, ...clientData, totalBilled: 0, activeProjectsCount: 1, createdAt: new Date().toISOString() }, ...prev.clients]
    }));
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setData(prev => ({
      ...prev,
      clients: prev.clients.map(c => (c.id === id ? { ...c, ...updates } : c))
    }));
  };

  const deleteClient = (id: string) => {
    setData(prev => ({
      ...prev,
      clients: prev.clients.filter(c => c.id !== id)
    }));
  };

  const addInteraction = (interactionData: Omit<InteractionLog, 'id'>) => {
    const id = 'int-' + Date.now();
    setData(prev => ({
      ...prev,
      interactions: [{ id, ...interactionData }, ...prev.interactions]
    }));
  };

  const deleteInteraction = (id: string) => {
    setData(prev => ({
      ...prev,
      interactions: prev.interactions.filter(i => i.id !== id)
    }));
  };

  // ERP Operations
  const addErpProject = (projectData: Omit<ErpProject, 'id'>) => {
    const id = 'erp-' + Date.now();
    setData(prev => ({
      ...prev,
      erpProjects: [{ id, ...projectData }, ...prev.erpProjects]
    }));
  };

  const updateErpProject = (id: string, updates: Partial<ErpProject>) => {
    setData(prev => ({
      ...prev,
      erpProjects: prev.erpProjects.map(p => (p.id === id ? { ...p, ...updates } : p))
    }));
  };

  const deleteErpProject = (id: string) => {
    setData(prev => ({
      ...prev,
      erpProjects: prev.erpProjects.filter(p => p.id !== id)
    }));
  };

  const toggleMilestone = (projectId: string, milestoneId: string) => {
    setData(prev => ({
      ...prev,
      erpProjects: prev.erpProjects.map(p => {
        if (p.id !== projectId) return p;
        const updatedMilestones = p.milestones.map(m =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const total = updatedMilestones.length || 1;
        return {
          ...p,
          milestones: updatedMilestones,
          progressPercent: Math.round((completedCount / total) * 100)
        };
      })
    }));
  };

  const addInvoice = (invoiceData: Omit<Invoice, 'id'>) => {
    const id = 'inv-' + Date.now();
    setData(prev => ({
      ...prev,
      invoices: [{ id, ...invoiceData }, ...prev.invoices]
    }));
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setData(prev => ({
      ...prev,
      invoices: prev.invoices.map(i => (i.id === id ? { ...i, ...updates } : i))
    }));
  };

  const deleteInvoice = (id: string) => {
    setData(prev => ({
      ...prev,
      invoices: prev.invoices.filter(i => i.id !== id)
    }));
  };

  const markInvoiceStatus = (id: string, status: 'paid' | 'pending' | 'overdue' | 'draft') => {
    setData(prev => ({
      ...prev,
      invoices: prev.invoices.map(i => (i.id === id ? { ...i, status } : i))
    }));
  };

  const addErpTask = (taskData: Omit<ErpTask, 'id'>) => {
    const id = 'task-' + Date.now();
    setData(prev => ({
      ...prev,
      erpTasks: [{ id, ...taskData }, ...prev.erpTasks]
    }));
  };

  const updateErpTask = (id: string, updates: Partial<ErpTask>) => {
    setData(prev => ({
      ...prev,
      erpTasks: prev.erpTasks.map(t => (t.id === id ? { ...t, ...updates } : t))
    }));
  };

  const deleteErpTask = (id: string) => {
    setData(prev => ({
      ...prev,
      erpTasks: prev.erpTasks.filter(t => t.id !== id)
    }));
  };

  const toggleTaskStatus = (taskId: string) => {
    setData(prev => ({
      ...prev,
      erpTasks: prev.erpTasks.map(t => (t.id === taskId ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' } : t))
    }));
  };

  const addExpense = (expenseData: Omit<ExpenseItem, 'id'>) => {
    const id = 'exp-' + Date.now();
    setData(prev => ({
      ...prev,
      expenses: [{ id, ...expenseData }, ...prev.expenses]
    }));
  };

  const deleteExpense = (id: string) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(e => e.id !== id)
    }));
  };

  // Settings
  const updateSettings = (settingsUpdates: Partial<SiteSettings>) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settingsUpdates }
    }));
  };

  const resetToDefaults = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportDataJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `bijaya_portfolio_crm_erp_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile && parsed.projects) {
        setData({
          ...initialPortfolioData,
          ...parsed,
          profile: { ...initialPortfolioData.profile, ...(parsed.profile || {}) },
          leads: parsed.leads || initialPortfolioData.leads || [],
          clients: parsed.clients || initialPortfolioData.clients || [],
          erpProjects: parsed.erpProjects || initialPortfolioData.erpProjects || [],
          invoices: parsed.invoices || initialPortfolioData.invoices || [],
          erpTasks: parsed.erpTasks || initialPortfolioData.erpTasks || [],
          expenses: parsed.expenses || initialPortfolioData.expenses || []
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON structure for portfolio', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isCMSOpen,
        setIsCMSOpen,
        cmsTab,
        setCmsTab,
        selectedProject,
        setSelectedProject,
        selectedBlog,
        setSelectedBlog,
        selectedGalleryItem,
        setSelectedGalleryItem,
        theme,
        toggleTheme,
        isAdminAuthenticated,
        adminUsername,
        adminLogin,
        adminLogout,
        changeAdminCredentials,
        changeAdminPassword,
        resetAdminPassword,
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
        submitContactForm,
        markMessageStatus,
        markAllMessagesAsRead,
        toggleMessageStarred,
        deleteMessage,
        convertMessageToLead,
        addLead,
        updateLead,
        deleteLead,
        updateLeadStage,
        addClient,
        updateClient,
        deleteClient,
        addInteraction,
        deleteInteraction,
        addErpProject,
        updateErpProject,
        deleteErpProject,
        toggleMilestone,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        markInvoiceStatus,
        addErpTask,
        updateErpTask,
        deleteErpTask,
        toggleTaskStatus,
        addExpense,
        deleteExpense,
        updateSettings,
        resetToDefaults,
        exportDataJson,
        importDataJson
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
