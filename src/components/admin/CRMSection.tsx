import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lead, Client, InteractionLog, LeadStage } from '../../types';
import {
  Users,
  UserPlus,
  TrendingUp,
  Phone,
  Mail,
  Building,
  DollarSign,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  MessageSquare,
  Search,
  Filter,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const CRMSection: React.FC = () => {
  const {
    data,
    addLead,
    updateLead,
    deleteLead,
    updateLeadStage,
    addClient,
    updateClient,
    deleteClient,
    addInteraction,
    deleteInteraction
  } = usePortfolio();

  const [activeSubTab, setActiveSubTab] = useState<'leads' | 'clients' | 'interactions'>('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');

  // Leads modal state
  const [isCreatingLead, setIsCreatingLead] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [leadForm, setLeadForm] = useState<Omit<Lead, 'id' | 'createdAt'>>({
    title: '',
    clientName: '',
    email: '',
    phone: '',
    company: '',
    stage: 'new',
    estimatedValue: 2000,
    currency: 'USD',
    priority: 'medium',
    source: 'Referral',
    notes: ''
  });

  // Clients modal state
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientForm, setClientForm] = useState<Omit<Client, 'id' | 'createdAt' | 'totalBilled' | 'activeProjectsCount'>>({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    status: 'active',
    industry: '',
    notes: ''
  });

  // Interactions state
  const [isCreatingInteraction, setIsCreatingInteraction] = useState(false);
  const [interactionForm, setInteractionForm] = useState<Omit<InteractionLog, 'id'>>({
    clientId: '',
    clientName: '',
    type: 'meeting',
    summary: '',
    date: new Date().toISOString().slice(0, 10),
    nextFollowUpDate: ''
  });

  const leadStages: { id: LeadStage; label: string; color: string }[] = [
    { id: 'new', label: 'New Inquiry', color: 'border-blue-500/40 text-blue-400 bg-blue-950/40' },
    { id: 'contacted', label: 'Contacted', color: 'border-amber-500/40 text-amber-400 bg-amber-950/40' },
    { id: 'proposal', label: 'Proposal Sent', color: 'border-purple-500/40 text-purple-400 bg-purple-950/40' },
    { id: 'negotiation', label: 'Negotiation', color: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/40' },
    { id: 'won', label: 'Won / Converted', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40' },
    { id: 'lost', label: 'Lost / Closed', color: 'border-slate-600 text-slate-400 bg-slate-900/40' }
  ];

  // Pipeline metrics
  const totalPipelineValue = data.leads
    .filter(l => l.stage !== 'lost')
    .reduce((acc, l) => acc + l.estimatedValue, 0);

  const activeLeadsCount = data.leads.filter(l => l.stage !== 'won' && l.stage !== 'lost').length;
  const wonLeadsCount = data.leads.filter(l => l.stage === 'won').length;

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      updateLead(editingLead.id, leadForm);
      setEditingLead(null);
    } else {
      addLead(leadForm);
      setIsCreatingLead(false);
    }
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      updateClient(editingClient.id, clientForm);
      setEditingClient(null);
    } else {
      addClient(clientForm);
      setIsCreatingClient(false);
    }
  };

  const handleSaveInteraction = (e: React.FormEvent) => {
    e.preventDefault();
    addInteraction(interactionForm);
    setIsCreatingInteraction(false);
    setInteractionForm({
      clientId: '',
      clientName: '',
      type: 'meeting',
      summary: '',
      date: new Date().toISOString().slice(0, 10),
      nextFollowUpDate: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* CRM Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/50 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Pipeline Opportunity</span>
            <div className="text-2xl font-bold text-white font-mono mt-0.5">
              ${totalPipelineValue.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-400">Active Deals: {activeLeadsCount}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600/15 flex items-center justify-center text-indigo-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/50 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Clients & Accounts</span>
            <div className="text-2xl font-bold text-white font-mono mt-0.5">
              {data.clients.length}
            </div>
            <span className="text-[11px] text-indigo-300">
              Active: {data.clients.filter(c => c.status === 'active').length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FF7A29]/15 flex items-center justify-center text-[#FF7A29]">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/50 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Won Deals Conversion</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">
              {wonLeadsCount} Closed
            </div>
            <span className="text-[11px] text-slate-400">
              Logged Interactions: {data.interactions.length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* CRM Sub-Navigation & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#080D22] border border-indigo-900/50 rounded-2xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveSubTab('leads')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'leads'
                ? 'bg-[#FF7A29] text-white shadow-md shadow-[#FF7A29]/20'
                : 'bg-indigo-950/60 text-slate-300 hover:text-white'
            }`}
          >
            Leads Pipeline ({data.leads.length})
          </button>
          <button
            onClick={() => setActiveSubTab('clients')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'clients'
                ? 'bg-[#FF7A29] text-white shadow-md shadow-[#FF7A29]/20'
                : 'bg-indigo-950/60 text-slate-300 hover:text-white'
            }`}
          >
            Client Directory ({data.clients.length})
          </button>
          <button
            onClick={() => setActiveSubTab('interactions')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'interactions'
                ? 'bg-[#FF7A29] text-white shadow-md shadow-[#FF7A29]/20'
                : 'bg-indigo-950/60 text-slate-300 hover:text-white'
            }`}
          >
            Activity Logs ({data.interactions.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeSubTab === 'leads' && (
            <button
              onClick={() => {
                setLeadForm({
                  title: '',
                  clientName: '',
                  email: '',
                  phone: '',
                  company: '',
                  stage: 'new',
                  estimatedValue: 2000,
                  currency: 'USD',
                  priority: 'medium',
                  source: 'Inquiry',
                  notes: ''
                });
                setEditingLead(null);
                setIsCreatingLead(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md hover:shadow-[#FF7A29]/30 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Lead</span>
            </button>
          )}

          {activeSubTab === 'clients' && (
            <button
              onClick={() => {
                setClientForm({
                  name: '',
                  company: '',
                  email: '',
                  phone: '',
                  website: '',
                  status: 'active',
                  industry: '',
                  notes: ''
                });
                setEditingClient(null);
                setIsCreatingClient(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md hover:shadow-[#FF7A29]/30 transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Client Profile</span>
            </button>
          )}

          {activeSubTab === 'interactions' && (
            <button
              onClick={() => setIsCreatingInteraction(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md hover:shadow-[#FF7A29]/30 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Meeting / Call</span>
            </button>
          )}
        </div>
      </div>

      {/* Subtab 1: Leads Pipeline */}
      {activeSubTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leads by title, client or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#080D22] border border-indigo-900/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF7A29]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setStageFilter('all')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  stageFilter === 'all' ? 'bg-indigo-900 text-white' : 'bg-[#080D22] text-slate-400'
                }`}
              >
                All Stages ({data.leads.length})
              </button>
              {leadStages.map(s => (
                <button
                  key={s.id}
                  onClick={() => setStageFilter(s.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                    stageFilter === s.id ? 'bg-[#FF7A29] text-white' : 'bg-[#080D22] text-slate-400'
                  }`}
                >
                  {s.label} ({data.leads.filter(l => l.stage === s.id).length})
                </button>
              ))}
            </div>
          </div>

          {/* Leads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.leads
              .filter(l => {
                const matchesSearch =
                  l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  l.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  l.email.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStage = stageFilter === 'all' || l.stage === stageFilter;
                return matchesSearch && matchesStage;
              })
              .map(lead => {
                const stageMeta = leadStages.find(s => s.id === lead.stage) || leadStages[0];
                return (
                  <div
                    key={lead.id}
                    className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/60 hover:border-indigo-700 transition-all flex flex-col justify-between group shadow-md"
                  >
                    <div>
                      {/* Top status */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${stageMeta.color}`}>
                          {stageMeta.label}
                        </span>
                        <div className="text-xs font-bold font-mono text-[#FF7A29]">
                          ${lead.estimatedValue.toLocaleString()} {lead.currency}
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-[#FF7A29] transition-colors line-clamp-1">
                        {lead.title}
                      </h4>

                      <div className="mt-2 text-xs text-slate-300 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="font-semibold">{lead.clientName}</span>
                          {lead.company && <span className="text-slate-400">({lead.company})</span>}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Mail className="w-3.5 h-3.5 text-[#FF7A29] shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </div>

                      {lead.notes && (
                        <p className="mt-2.5 p-2 rounded-lg bg-[#060A1A] border border-indigo-950 text-[11px] text-slate-400 line-clamp-2">
                          {lead.notes}
                        </p>
                      )}
                    </div>

                    {/* Bottom Controls */}
                    <div className="mt-4 pt-3 border-t border-indigo-950 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <select
                          value={lead.stage}
                          onChange={(e) => updateLeadStage(lead.id, e.target.value as LeadStage)}
                          className="px-2 py-1 rounded-lg bg-[#0E1538] border border-indigo-800 text-[11px] text-slate-200 focus:outline-none"
                        >
                          {leadStages.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setLeadForm({
                              title: lead.title,
                              clientName: lead.clientName,
                              email: lead.email,
                              phone: lead.phone || '',
                              company: lead.company || '',
                              stage: lead.stage,
                              estimatedValue: lead.estimatedValue,
                              currency: lead.currency,
                              priority: lead.priority,
                              source: lead.source,
                              notes: lead.notes || ''
                            });
                            setEditingLead(lead);
                            setIsCreatingLead(true);
                          }}
                          className="p-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-slate-300 hover:text-white transition-colors"
                          title="Edit Lead"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this CRM lead?')) deleteLead(lead.id);
                          }}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-white transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Subtab 2: Clients Directory */}
      {activeSubTab === 'clients' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.clients.map(client => (
              <div
                key={client.id}
                className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/60 hover:border-indigo-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        client.status === 'active'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {client.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Billed: ${client.totalBilled.toLocaleString()}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">{client.name}</h4>
                  <div className="text-xs font-semibold text-[#FF7A29] mb-3">{client.company}</div>

                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#FF7A29]" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    {client.industry && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>Industry: {client.industry}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-950 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Projects: {client.activeProjectsCount}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setClientForm({
                          name: client.name,
                          company: client.company,
                          email: client.email,
                          phone: client.phone || '',
                          website: client.website || '',
                          status: client.status,
                          industry: client.industry || '',
                          notes: client.notes || ''
                        });
                        setEditingClient(client);
                        setIsCreatingClient(true);
                      }}
                      className="p-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-slate-300 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this client?')) deleteClient(client.id);
                      }}
                      className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-white"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Interactions Log */}
      {activeSubTab === 'interactions' && (
        <div className="space-y-3">
          <div className="divide-y divide-indigo-950/80 rounded-2xl bg-[#080D22] border border-indigo-900/60 overflow-hidden">
            {data.interactions.map(log => (
              <div key={log.id} className="p-4 flex items-start justify-between gap-4 hover:bg-[#0A102A] transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/15 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{log.clientName}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-indigo-950 text-indigo-300 uppercase border border-indigo-800/40">
                        {log.type}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{log.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{log.summary}</p>
                    {log.nextFollowUpDate && (
                      <div className="mt-2 text-[11px] text-[#FF7A29] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Next Follow-up: {log.nextFollowUpDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteInteraction(log.id)}
                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/70 text-red-400 hover:text-white transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lead Create / Edit Modal */}
      {isCreatingLead && (
        <div
          onClick={() => setIsCreatingLead(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0D122B] border border-indigo-700/60 rounded-3xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-base font-bold text-white mb-4">
              {editingLead ? 'Edit CRM Lead' : 'Create New Lead Opportunity'}
            </h3>

            <form onSubmit={handleSaveLead} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deal / Project Title</label>
                <input
                  type="text"
                  required
                  value={leadForm.title}
                  onChange={(e) => setLeadForm({ ...leadForm, title: e.target.value })}
                  placeholder="e.g. Enterprise Django Portal Development"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={leadForm.clientName}
                    onChange={(e) => setLeadForm({ ...leadForm, clientName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Org</label>
                  <input
                    type="text"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Stage</label>
                  <select
                    value={leadForm.stage}
                    onChange={(e) => setLeadForm({ ...leadForm, stage: e.target.value as LeadStage })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  >
                    {leadStages.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Value ($)</label>
                  <input
                    type="number"
                    value={leadForm.estimatedValue}
                    onChange={(e) => setLeadForm({ ...leadForm, estimatedValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={leadForm.priority}
                    onChange={(e) => setLeadForm({ ...leadForm, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes & Scope</label>
                <textarea
                  rows={3}
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  placeholder="Key project requirements, timeline, budget details..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingLead(false)}
                  className="px-4 py-2 rounded-xl bg-indigo-950 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client Modal */}
      {isCreatingClient && (
        <div
          onClick={() => setIsCreatingClient(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0D122B] border border-indigo-700/60 rounded-3xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-base font-bold text-white mb-4">
              {editingClient ? 'Edit Client Profile' : 'Add New Client'}
            </h3>

            <form onSubmit={handleSaveClient} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={clientForm.company}
                    onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={clientForm.status}
                    onChange={(e) => setClientForm({ ...clientForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="past">Past Client</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Industry</label>
                  <input
                    type="text"
                    value={clientForm.industry}
                    onChange={(e) => setClientForm({ ...clientForm, industry: e.target.value })}
                    placeholder="e.g. EdTech / Healthcare"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingClient(false)}
                  className="px-4 py-2 rounded-xl bg-indigo-950 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interaction Modal */}
      {isCreatingInteraction && (
        <div
          onClick={() => setIsCreatingInteraction(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0D122B] border border-indigo-700/60 rounded-3xl p-6 shadow-2xl text-slate-100"
          >
            <h3 className="text-base font-bold text-white mb-4">Log Activity / Interaction</h3>
            <form onSubmit={handleSaveInteraction} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name / Contact</label>
                <input
                  type="text"
                  required
                  value={interactionForm.clientName}
                  onChange={(e) => setInteractionForm({ ...interactionForm, clientName: e.target.value })}
                  placeholder="e.g. Apex Financial Systems"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Interaction Type</label>
                  <select
                    value={interactionForm.type}
                    onChange={(e) => setInteractionForm({ ...interactionForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  >
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="meeting">Video Meeting</option>
                    <option value="note">Internal Note</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={interactionForm.date}
                    onChange={(e) => setInteractionForm({ ...interactionForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Summary & Action Items</label>
                <textarea
                  required
                  rows={3}
                  value={interactionForm.summary}
                  onChange={(e) => setInteractionForm({ ...interactionForm, summary: e.target.value })}
                  placeholder="Discussed architecture changes and timeline..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Next Follow-Up Date</label>
                <input
                  type="date"
                  value={interactionForm.nextFollowUpDate}
                  onChange={(e) => setInteractionForm({ ...interactionForm, nextFollowUpDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingInteraction(false)}
                  className="px-4 py-2 rounded-xl bg-indigo-950 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md"
                >
                  Log Interaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
