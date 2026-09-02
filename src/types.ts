export interface Profile {
  name: string;
  tagline: string;
  subheadline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  twitter?: string;
  whatsapp?: string;
  website?: string;
  availability: 'Available for Freelance & Full-time' | 'Open to Select Projects' | 'Busy';
  yearsExperience: string;
  bio: string;
  professionalSummary: string;
  education: {
    degree: string;
    field: string;
    institution?: string;
    details?: string;
  };
  keyStrengths: string[];
  coreCompetencies: string[];
}

export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'cms' | 'tools';
  level: number; // 1-100
  badge?: string;
  iconName?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export type ProjectCategory = 'Full-Stack' | 'WordPress' | 'AI Automation' | 'Backend API' | 'Frontend UI';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  summary: string;
  fullDescription: string;
  coverImage: string;
  screenshots: string[];
  techStack: string[];
  features: string[];
  resultsOrMetrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  client?: string;
  duration?: string;
  featured: boolean;
  date: string;
}

export interface WorkEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'Full-time' | 'Freelance / Contract' | 'Project Engagement';
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  author: string;
  isPublished: boolean;
  views?: number;
}

export type GalleryCategory = 'Web Apps' | 'WordPress' | 'AI Systems' | 'UI/UX Mockups' | 'Architecture';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  highResUrl: string;
  resolution: string;
  aspectRatio: string;
  description: string;
  date: string;
  tags: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  serviceInterest: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'archived';
  starred?: boolean;
}

// CRM Interfaces
export type LeadStage = 'new' | 'contacted' | 'proposal' | 'negotiation' | 'won' | 'lost';

export interface Lead {
  id: string;
  title: string;
  clientName: string;
  company?: string;
  email: string;
  phone?: string;
  stage: LeadStage;
  estimatedValue: number;
  currency: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
  notes?: string;
  createdAt: string;
  expectedCloseDate?: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location?: string;
  status: 'active' | 'completed' | 'prospective';
  totalBilled: number;
  activeProjectsCount: number;
  notes?: string;
  createdAt: string;
  website?: string;
}

export interface InteractionLog {
  id: string;
  clientId?: string;
  clientName: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Note' | 'Contract';
  date: string;
  summary: string;
  nextFollowUp?: string;
}

// ERP Interfaces
export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface ErpProject {
  id: string;
  title: string;
  clientId?: string;
  clientName: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  startDate: string;
  deadline: string;
  budget: number;
  currency: string;
  progressPercent: number;
  milestones: ProjectMilestone[];
  priority: 'high' | 'medium' | 'low';
  techStack?: string[];
  description?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  clientAddress?: string;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number; // e.g. 0% or 13%
  taxAmount: number;
  totalAmount: number;
  currency: string;
  paymentMethod?: string;
  notes?: string;
}

export interface ErpTask {
  id: string;
  title: string;
  projectId?: string;
  projectName?: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'completed';
  estimatedHours: number;
  loggedHours: number;
  dueDate: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  category: 'Hosting & Server' | 'Software & Subscriptions' | 'Domain & SSL' | 'Equipment' | 'Marketing' | 'Other';
  amount: number;
  currency: string;
  date: string;
  status: 'paid' | 'pending';
  vendor?: string;
}

export interface SiteSettings {
  primaryColor: string; // #FF7A29
  accentColor: string; // #16194A / #6366F1
  themeMode: 'dark' | 'light' | 'system';
  enableBlog: boolean;
  enableGallery: boolean;
  enableHireMeCta: boolean;
  customStatusBanner?: string;
}

export interface PortfolioData {
  profile: Profile;
  skillCategories: SkillCategory[];
  projects: Project[];
  workEntries: WorkEntry[];
  blogPosts: BlogPost[];
  gallery: GalleryItem[];
  messages: ContactMessage[];
  settings: SiteSettings;
  // CRM & ERP extensions
  leads: Lead[];
  clients: Client[];
  interactions: InteractionLog[];
  erpProjects: ErpProject[];
  invoices: Invoice[];
  erpTasks: ErpTask[];
  expenses: ExpenseItem[];
}
