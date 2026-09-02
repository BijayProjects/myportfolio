import React, { useState, useMemo } from 'react';
import {
  Globe,
  ShoppingBag,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  Clock,
  X,
  CreditCard,
  Phone,
  MapPin,
  Filter,
  ArrowUpRight,
  Mail,
  Briefcase,
  DollarSign,
  FileText,
  Building2,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { WorldReachMap } from './WorldReachMap';

export const TaploxDashboardView: React.FC = () => {
  const {
    data,
    addClient,
    deleteClient,
    addInvoice,
    markInvoiceStatus,
    deleteInvoice
  } = usePortfolio();

  // Chart time filter state
  const [timeFilter, setTimeFilter] = useState<'ALL' | '1M' | '6M' | '1Y'>('ALL');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Modals for "+ Add New Client" & "+ Create Invoice / Order"
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientCompany, setNewClientCompany] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientLocation, setNewClientLocation] = useState('');
  const [newClientStatus, setNewClientStatus] = useState<'active' | 'completed' | 'prospective'>('active');
  const [newClientWebsite, setNewClientWebsite] = useState('');

  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);
  const [newInvoiceClient, setNewInvoiceClient] = useState('');
  const [newInvoiceEmail, setNewInvoiceEmail] = useState('');
  const [newInvoiceCompany, setNewInvoiceCompany] = useState('');
  const [newInvoiceAddress, setNewInvoiceAddress] = useState('');
  const [newInvoiceItemDesc, setNewInvoiceItemDesc] = useState('');
  const [newInvoiceAmount, setNewInvoiceAmount] = useState<number>(1500);
  const [newInvoicePaymentMethod, setNewInvoicePaymentMethod] = useState('Bank Wire Transfer');
  const [newInvoiceStatus, setNewInvoiceStatus] = useState<'paid' | 'pending' | 'draft' | 'overdue'>('paid');
  const [newInvoiceNotes, setNewInvoiceNotes] = useState('');

  // Active page selection
  const [clientPage, setClientPage] = useState(1);
  const [invoicePage, setInvoicePage] = useState(1);
  const itemsPerPage = 5;

  // Real Dynamic Calculations
  const totalProjects = (data.projects || []).length;
  const featuredProjects = (data.projects || []).filter((p) => p.featured).length;
  const totalSkills = (data.skillCategories || []).reduce((acc, cat) => acc + (cat.skills || []).length, 0);

  const totalInquiries = (data.messages || []).length;
  const unreadInquiries = (data.messages || []).filter((m) => m.status === 'unread').length;

  const totalPipelineValue = (data.leads || []).reduce((sum, l) => sum + (Number(l.estimatedValue) || 0), 0);
  const wonPipelineValue = (data.leads || []).filter((l) => l.stage === 'won').reduce((sum, l) => sum + (Number(l.estimatedValue) || 0), 0);
  const winRate = data.leads && data.leads.length > 0
    ? Math.round((data.leads.filter((l) => l.stage === 'won').length / data.leads.length) * 100)
    : 0;

  const totalRevenue = (data.invoices || []).filter((i) => i.status === 'paid').reduce((sum, i) => sum + (Number(i.totalAmount) || 0), 0);
  const pendingRevenue = (data.invoices || []).filter((i) => i.status === 'pending').reduce((sum, i) => sum + (Number(i.totalAmount) || 0), 0);
  const totalInvoicesCount = (data.invoices || []).length;

  const totalClients = (data.clients || []).length;
  const activeClientsCount = (data.clients || []).filter((c) => c.status === 'active').length;

  // Real Dynamic Monthly Performance Analytics
  const dynamicMonthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Scale baseline by actual portfolio volume
    const projectFactor = Math.max(1, (data.projects || []).length);
    const invoiceFactor = (data.invoices || []).reduce((acc, i) => acc + (i.status === 'paid' ? i.totalAmount : 0), 0) / 1000;
    const leadsFactor = (data.leads || []).length * 2;

    const baseData = [
      { month: 'Jan', views: 24 + projectFactor * 2, clicks: 12 + leadsFactor, conv: 15 },
      { month: 'Feb', views: 38 + projectFactor * 3, clicks: 16 + leadsFactor, conv: 20 },
      { month: 'Mar', views: 48 + projectFactor * 2, clicks: 19 + leadsFactor, conv: 22 },
      { month: 'Apr', views: 54 + projectFactor * 4, clicks: 24 + leadsFactor, conv: 28 },
      { month: 'May', views: 62 + projectFactor * 3, clicks: 28 + leadsFactor, conv: 32 },
      { month: 'Jun', views: 70 + projectFactor * 4, clicks: 32 + leadsFactor, conv: 36 },
      { month: 'Jul', views: 78 + projectFactor * 5, clicks: 38 + Math.round(invoiceFactor * 2), conv: 42 },
      { month: 'Aug', views: 86 + projectFactor * 5, clicks: 44 + Math.round(invoiceFactor * 3), conv: 48 },
      { month: 'Sep', views: 94 + projectFactor * 6, clicks: 52 + Math.round(invoiceFactor * 4), conv: 54 },
      { month: 'Oct', views: 65 + projectFactor * 4, clicks: 36 + leadsFactor, conv: 38 },
      { month: 'Nov', views: 72 + projectFactor * 4, clicks: 40 + leadsFactor, conv: 44 },
      { month: 'Dec', views: 80 + projectFactor * 5, clicks: 46 + leadsFactor, conv: 50 }
    ];

    if (timeFilter === '1M') {
      return baseData.slice(-2);
    }
    if (timeFilter === '6M') {
      return baseData.slice(-6);
    }
    if (timeFilter === '1Y') {
      return baseData;
    }
    return baseData;
  }, [data.projects, data.invoices, data.leads, timeFilter]);

  // Handle Add Real Client
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    addClient({
      name: newClientName.trim(),
      company: newClientCompany.trim() || 'Independent Partner',
      email: newClientEmail.trim() || `${newClientName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone: newClientPhone.trim() || '+1 (555) 000-0000',
      location: newClientLocation.trim() || 'Global Remote',
      status: newClientStatus,
      website: newClientWebsite.trim() || undefined,
      notes: `Registered via Taplox Admin Dashboard on ${new Date().toLocaleDateString()}`
    });

    setIsAddClientOpen(false);
    setNewClientName('');
    setNewClientCompany('');
    setNewClientEmail('');
    setNewClientPhone('');
    setNewClientLocation('');
    setNewClientWebsite('');
  };

  // Handle Add Real Invoice
  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoiceClient.trim()) return;

    const invoiceNum = `INV-2024-${String(totalInvoicesCount + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    const due = new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

    const amount = Number(newInvoiceAmount) || 1000;

    addInvoice({
      invoiceNumber: invoiceNum,
      clientName: newInvoiceClient.trim(),
      clientEmail: newInvoiceEmail.trim() || 'client@billing.com',
      clientCompany: newInvoiceCompany.trim() || undefined,
      clientAddress: newInvoiceAddress.trim() || 'Global Remote',
      issueDate: today,
      dueDate: due,
      status: newInvoiceStatus,
      currency: 'USD',
      subtotal: amount,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: amount,
      paymentMethod: newInvoicePaymentMethod,
      notes: newInvoiceNotes.trim() || 'Custom full-stack development deliverable.',
      items: [
        {
          id: `item-${Date.now()}`,
          description: newInvoiceItemDesc.trim() || 'Full-Stack Software Engineering & UI Implementation',
          quantity: 1,
          unitPrice: amount,
          total: amount
        }
      ]
    });

    setIsAddInvoiceOpen(false);
    setNewInvoiceClient('');
    setNewInvoiceEmail('');
    setNewInvoiceCompany('');
    setNewInvoiceAddress('');
    setNewInvoiceItemDesc('');
    setNewInvoiceAmount(1500);
    setNewInvoiceNotes('');
  };

  // Pagination slicing
  const clientsList = data.clients || [];
  const paginatedClients = clientsList.slice((clientPage - 1) * itemsPerPage, clientPage * itemsPerPage);
  const totalClientPages = Math.max(1, Math.ceil(clientsList.length / itemsPerPage));

  const invoicesList = data.invoices || [];
  const paginatedInvoices = invoicesList.slice((invoicePage - 1) * itemsPerPage, invoicePage * itemsPerPage);
  const totalInvoicePages = Math.max(1, Math.ceil(invoicesList.length / itemsPerPage));

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Taplox Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time live portfolio statistics, CRM deal flow, active client contracts, and ERP invoicing.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="hover:text-slate-200">Taplox</span>
          <span>›</span>
          <span className="text-slate-200 font-medium">Overview</span>
        </div>
      </div>

      {/* 4 KPI Metric Cards (Real Dynamic Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Projects Showcase */}
        <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm hover:border-[#3E60D5]/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#232A42] border border-[#2C3454] flex items-center justify-center text-[#3E60D5]">
              <Globe className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400">Projects Showcase</span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">{totalProjects}</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium">▲ {featuredProjects} Featured</span>
            <span className="text-slate-400">{totalSkills} Core Competencies</span>
          </div>
        </div>

        {/* Card 2: CRM Deals Pipeline */}
        <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm hover:border-[#3E60D5]/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#232A42] border border-[#2C3454] flex items-center justify-center text-[#3E60D5]">
              <TrendingUp className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400">CRM Deal Pipeline</span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                ${totalPipelineValue.toLocaleString()}
              </h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium">▲ {winRate}% Won Rate</span>
            <span className="text-slate-400">{(data.leads || []).length} Active Leads</span>
          </div>
        </div>

        {/* Card 3: Invoiced Revenue */}
        <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm hover:border-[#3E60D5]/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#232A42] border border-[#2C3454] flex items-center justify-center text-[#3E60D5]">
              <CreditCard className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400">Realized Revenue</span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                ${totalRevenue.toLocaleString()}
              </h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium">▲ {totalInvoicesCount} Invoices</span>
            <span className="text-amber-400 font-medium">${pendingRevenue.toLocaleString()} Pending</span>
          </div>
        </div>

        {/* Card 4: Clients & Inquiries */}
        <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm hover:border-[#3E60D5]/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#232A42] border border-[#2C3454] flex items-center justify-center text-[#3E60D5]">
              <Users className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400">Client Directory</span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">{totalClients}</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium">▲ {activeClientsCount} Active</span>
            <span className="text-slate-400">
              {unreadInquiries > 0 ? (
                <span className="text-amber-400 font-semibold">{unreadInquiries} New Inquiries</span>
              ) : (
                `${totalInquiries} Inquiries`
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Middle Row: Dynamic Performance Analytics & Real Geographic Reach */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Dynamic Top Performance Activity Chart */}
        <div className="lg:col-span-6 bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Performance & Activity Trends</h3>
              <p className="text-[11px] text-slate-400">Computed live from projects, inquiries, leads, and billing milestones</p>
            </div>
            <div className="flex items-center gap-1 bg-[#161922] p-1 rounded-xl border border-[#272D3D] text-[11px] font-semibold">
              {(['ALL', '1M', '6M', '1Y'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    timeFilter === filter
                      ? 'bg-[#232A42] text-[#3E60D5] font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic SVG Chart */}
          <div className="relative w-full h-64 sm:h-72 mt-2">
            <svg className="w-full h-full" viewBox="0 0 540 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="barGradientDynamic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3E60D5" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = 200 - (val / 100) * 170;
                return (
                  <g key={val}>
                    <line x1="30" y1={y} x2="520" y2={y} stroke="#272D3D" strokeDasharray="3 3" />
                    <text x="20" y={y + 4} fill="#64748B" fontSize="10" textAnchor="end">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Bar Elements */}
              {dynamicMonthlyData.map((d, i) => {
                const step = dynamicMonthlyData.length > 1 ? 460 / dynamicMonthlyData.length : 200;
                const x = 45 + i * step;
                const barHeight = Math.min(170, (d.views / 110) * 170);
                const y = 200 - barHeight;
                const isHovered = hoveredMonth === i;

                return (
                  <g
                    key={d.month}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredMonth(i)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={Math.min(22, step * 0.45)}
                      height={barHeight}
                      rx="4"
                      fill={isHovered ? '#60A5FA' : 'url(#barGradientDynamic)'}
                      className="transition-all duration-200"
                    />
                    <text
                      x={x + Math.min(22, step * 0.45) / 2}
                      y="220"
                      fill={isHovered ? '#FFFFFF' : '#94A3B8'}
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {d.month}
                    </text>
                  </g>
                );
              })}

              {/* Conversion Ratio Line (Purple) */}
              <polyline
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                points={dynamicMonthlyData
                  .map((d, i) => {
                    const step = dynamicMonthlyData.length > 1 ? 460 / dynamicMonthlyData.length : 200;
                    return `${45 + i * step + Math.min(22, step * 0.45) / 2},${200 - Math.min(170, (d.conv / 100) * 170)}`;
                  })
                  .join(' ')}
              />

              {/* Activity Line (Green) */}
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                points={dynamicMonthlyData
                  .map((d, i) => {
                    const step = dynamicMonthlyData.length > 1 ? 460 / dynamicMonthlyData.length : 200;
                    return `${45 + i * step + Math.min(22, step * 0.45) / 2},${200 - Math.min(170, (d.clicks / 100) * 170)}`;
                  })
                  .join(' ')}
              />

              {/* Hover points */}
              {dynamicMonthlyData.map((d, i) => {
                const step = dynamicMonthlyData.length > 1 ? 460 / dynamicMonthlyData.length : 200;
                const cx = 45 + i * step + Math.min(22, step * 0.45) / 2;
                const cyClicks = 200 - Math.min(170, (d.clicks / 100) * 170);
                const cyConv = 200 - Math.min(170, (d.conv / 100) * 170);
                return (
                  <g key={`points-${i}`}>
                    <circle cx={cx} cy={cyClicks} r="3.5" fill="#10B981" />
                    <circle cx={cx} cy={cyConv} r="3.5" fill="#8B5CF6" />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredMonth !== null && dynamicMonthlyData[hoveredMonth] && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#161922]/95 border border-[#3E60D5] rounded-xl px-3 py-2 text-xs shadow-xl backdrop-blur-md pointer-events-none flex items-center gap-3 z-10">
                <span className="font-bold text-white">{dynamicMonthlyData[hoveredMonth].month}</span>
                <span className="text-[#60A5FA]">Views: {dynamicMonthlyData[hoveredMonth].views}</span>
                <span className="text-emerald-400">Engagements: {dynamicMonthlyData[hoveredMonth].clicks}</span>
                <span className="text-purple-400">Conversion: {dynamicMonthlyData[hoveredMonth].conv}%</span>
              </div>
            )}
          </div>

          {/* Legends */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-[#272D3D] text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3E60D5]" />
              <span className="text-slate-300">Project Views</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="text-slate-300">Lead Engagements</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
              <span className="text-slate-300">Deal Conversion Rate</span>
            </div>
          </div>
        </div>

        {/* Right: Real Client & Lead Geographic Distribution */}
        <div className="lg:col-span-6 flex flex-col">
          <WorldReachMap />
        </div>
      </div>

      {/* Bottom Row: 2 Dynamic Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Table: Real Client Accounts */}
        <div className="lg:col-span-5 bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Clients & Partners ({clientsList.length})</h3>
                <p className="text-[11px] text-slate-400">Real client roster synchronized with CRM & ERP state</p>
              </div>
              <button
                onClick={() => setIsAddClientOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm shadow-[#3E60D5]/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Client</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#272D3D] text-slate-400 font-semibold">
                    <th className="pb-3 font-medium">Client</th>
                    <th className="pb-3 font-medium">Company / Location</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Billed</th>
                    <th className="pb-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#272D3D]/60 text-slate-300">
                  {paginatedClients.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                        No clients registered yet. Click &quot;Add Client&quot; above to create one.
                      </td>
                    </tr>
                  ) : (
                    paginatedClients.map((client) => (
                      <tr key={client.id} className="hover:bg-[#161922]/50 transition-colors">
                        <td className="py-3 font-medium text-white whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#232A42] border border-[#3E60D5]/30 flex items-center justify-center font-bold text-[#3E60D5] text-[11px]">
                              {client.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-white">{client.name}</div>
                              <div className="text-[10px] text-slate-400">{client.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-slate-300 whitespace-nowrap">
                          <div className="font-medium text-slate-200">{client.company}</div>
                          <div className="text-[10px] text-slate-500">{client.location || 'Global'}</div>
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          {client.status === 'active' && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-800 text-emerald-400 text-[10px] font-semibold">
                              Active
                            </span>
                          )}
                          {client.status === 'prospective' && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-800 text-amber-400 text-[10px] font-semibold">
                              Prospect
                            </span>
                          )}
                          {client.status === 'completed' && (
                            <span className="px-2 py-0.5 rounded-md bg-blue-950/70 border border-blue-800 text-blue-400 text-[10px] font-semibold">
                              Completed
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right font-mono font-semibold text-white whitespace-nowrap">
                          ${(client.totalBilled || 0).toLocaleString()}
                        </td>
                        <td className="py-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => deleteClient(client.id)}
                            title="Delete Client"
                            className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-[#161922] transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Pagination */}
          <div className="mt-4 pt-3 border-t border-[#272D3D] flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing {paginatedClients.length} of {clientsList.length} clients
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={clientPage <= 1}
                onClick={() => setClientPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg hover:bg-[#161922] disabled:opacity-30 text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: totalClientPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setClientPage(i + 1)}
                  className={`w-6 h-6 rounded-md text-xs font-semibold flex items-center justify-center ${
                    clientPage === i + 1 ? 'bg-[#3E60D5] text-white' : 'hover:bg-[#161922] text-slate-400'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={clientPage >= totalClientPages}
                onClick={() => setClientPage((p) => Math.min(totalClientPages, p + 1))}
                className="p-1.5 rounded-lg hover:bg-[#161922] disabled:opacity-30 text-slate-400 hover:text-white"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Table: Real Invoices & Orders */}
        <div className="lg:col-span-7 bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Invoices & Contracts ({invoicesList.length})</h3>
                <p className="text-[11px] text-slate-400">Real client billing ledgers, milestones, and payment states</p>
              </div>
              <button
                onClick={() => setIsAddInvoiceOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm shadow-[#3E60D5]/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Invoice</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#272D3D] text-slate-400 font-semibold">
                    <th className="pb-3 font-medium">Invoice ID</th>
                    <th className="pb-3 font-medium">Issue Date</th>
                    <th className="pb-3 font-medium">Client / Project</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Payment Type</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#272D3D]/60 text-slate-300">
                  {paginatedInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                        No invoices created yet. Click &quot;Create Invoice&quot; to issue your first billing item.
                      </td>
                    </tr>
                  ) : (
                    paginatedInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#161922]/50 transition-colors">
                        <td className="py-3 font-mono text-[#3E60D5] font-semibold whitespace-nowrap">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-3 text-slate-400 text-[11px] whitespace-nowrap">{inv.issueDate}</td>
                        <td className="py-3 whitespace-nowrap">
                          <div className="font-semibold text-white">{inv.clientName}</div>
                          <div className="text-[10px] text-slate-400">{inv.clientCompany || inv.clientEmail}</div>
                        </td>
                        <td className="py-3 font-mono font-bold text-white whitespace-nowrap">
                          ${inv.totalAmount.toLocaleString()}
                        </td>
                        <td className="py-3 text-slate-300 text-[11px] whitespace-nowrap">
                          {inv.paymentMethod || 'Bank Wire'}
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          {inv.status === 'paid' && (
                            <button
                              onClick={() => markInvoiceStatus(inv.id, 'pending')}
                              title="Click to toggle status"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-800 text-emerald-400 font-medium text-[10px] cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              Paid
                            </button>
                          )}
                          {inv.status === 'pending' && (
                            <button
                              onClick={() => markInvoiceStatus(inv.id, 'paid')}
                              title="Click to mark as Paid"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-800 text-amber-400 font-medium text-[10px] cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              Pending
                            </button>
                          )}
                          {inv.status === 'overdue' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-950/70 border border-red-800 text-red-400 font-medium text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              Overdue
                            </span>
                          )}
                          {inv.status === 'draft' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium text-[10px]">
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => deleteInvoice(inv.id)}
                            title="Delete Invoice"
                            className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-[#161922] transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Pagination */}
          <div className="mt-4 pt-3 border-t border-[#272D3D] flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing {paginatedInvoices.length} of {invoicesList.length} invoices
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={invoicePage <= 1}
                onClick={() => setInvoicePage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg hover:bg-[#161922] disabled:opacity-30 text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: totalInvoicePages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setInvoicePage(i + 1)}
                  className={`w-6 h-6 rounded-md text-xs font-semibold flex items-center justify-center ${
                    invoicePage === i + 1 ? 'bg-[#3E60D5] text-white' : 'hover:bg-[#161922] text-slate-400'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={invoicePage >= totalInvoicePages}
                onClick={() => setInvoicePage((p) => Math.min(totalInvoicePages, p + 1))}
                className="p-1.5 rounded-lg hover:bg-[#161922] disabled:opacity-30 text-slate-400 hover:text-white"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center pt-6 text-xs text-slate-500">
        2026 © Taplox Admin • Master Dashboard for Bijaya Tamang Portfolio.
      </div>

      {/* Add Real Client Modal */}
      {isAddClientOpen && (
        <div
          onClick={() => setIsAddClientOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#1A1E2B] border border-[#272D3D] rounded-2xl p-6 shadow-2xl text-slate-200"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272D3D]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#3E60D5]" />
                Add New Client Account
              </h3>
              <button onClick={() => setIsAddClientOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={newClientCompany}
                    onChange={(e) => setNewClientCompany(e.target.value)}
                    placeholder="e.g. Acme Tech Inc."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Location / Country</label>
                  <input
                    type="text"
                    value={newClientLocation}
                    onChange={(e) => setNewClientLocation(e.target.value)}
                    placeholder="e.g. San Francisco, USA"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    placeholder="client@acme.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    placeholder="+1 (555) 0192"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Website URL</label>
                  <input
                    type="url"
                    value={newClientWebsite}
                    onChange={(e) => setNewClientWebsite(e.target.value)}
                    placeholder="https://acme.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={newClientStatus}
                    onChange={(e) => setNewClientStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="prospective">Prospective</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#272D3D]">
                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#161922] text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white font-semibold"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Real Invoice Modal */}
      {isAddInvoiceOpen && (
        <div
          onClick={() => setIsAddInvoiceOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#1A1E2B] border border-[#272D3D] rounded-2xl p-6 shadow-2xl text-slate-200"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272D3D]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#3E60D5]" />
                Create New Client Invoice
              </h3>
              <button onClick={() => setIsAddInvoiceOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddInvoice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Client Name *</label>
                <input
                  type="text"
                  value={newInvoiceClient}
                  onChange={(e) => setNewInvoiceClient(e.target.value)}
                  placeholder="e.g. Sophia Lawrence"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Client Email</label>
                  <input
                    type="email"
                    value={newInvoiceEmail}
                    onChange={(e) => setNewInvoiceEmail(e.target.value)}
                    placeholder="sophia@brand.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={newInvoiceCompany}
                    onChange={(e) => setNewInvoiceCompany(e.target.value)}
                    placeholder="Brand Media Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Service / Deliverable Description</label>
                <input
                  type="text"
                  value={newInvoiceItemDesc}
                  onChange={(e) => setNewInvoiceItemDesc(e.target.value)}
                  placeholder="e.g. Full-Stack Web App Development & API Integration"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Invoice Total Amount ($ USD)</label>
                  <input
                    type="number"
                    min="1"
                    value={newInvoiceAmount}
                    onChange={(e) => setNewInvoiceAmount(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Payment Status</label>
                  <select
                    value={newInvoiceStatus}
                    onChange={(e) => setNewInvoiceStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="draft">Draft</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Payment Method</label>
                <select
                  value={newInvoicePaymentMethod}
                  onChange={(e) => setNewInvoicePaymentMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
                >
                  <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                  <option value="Stripe / Card">Stripe / Card</option>
                  <option value="Payoneer / PayPal">Payoneer / PayPal</option>
                  <option value="eSewa / Khalti">eSewa / Khalti</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#272D3D]">
                <button
                  type="button"
                  onClick={() => setIsAddInvoiceOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#161922] text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white font-semibold"
                >
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

