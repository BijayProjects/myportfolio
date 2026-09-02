import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ErpProject, Invoice, ErpTask, ExpenseItem } from '../../types';
import {
  FolderKanban,
  Receipt,
  CheckSquare,
  TrendingDown,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  Download,
  Search,
  Filter,
  Layers,
  ChevronRight,
  TrendingUp,
  Percent
} from 'lucide-react';

export const ERPSection: React.FC = () => {
  const {
    data,
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
    deleteExpense
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'projects' | 'invoices' | 'tasks' | 'expenses'>('projects');

  // ERP Project state
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<ErpProject | null>(null);
  const [projectForm, setProjectForm] = useState<Omit<ErpProject, 'id'>>({
    title: '',
    clientName: '',
    status: 'in-progress',
    budget: 3500,
    spent: 0,
    startDate: new Date().toISOString().slice(0, 10),
    deadline: '',
    progressPercent: 20,
    milestones: [
      { id: 'm-1', title: 'Architecture & DB Design', dueDate: '', completed: true },
      { id: 'm-2', title: 'Core API Implementation', dueDate: '', completed: false },
      { id: 'm-3', title: 'Client Review & Staging Deploy', dueDate: '', completed: false }
    ],
    notes: ''
  });

  // Invoice state
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [invoiceForm, setInvoiceForm] = useState<Omit<Invoice, 'id'>>({
    invoiceNumber: 'INV-' + (Math.floor(Math.random() * 9000) + 1000),
    clientName: '',
    clientEmail: '',
    amount: 1500,
    currency: 'USD',
    status: 'pending',
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    items: [
      { id: 'item-1', description: 'Web Application Development Sprint', quantity: 1, unitPrice: 1500, total: 1500 }
    ],
    notes: 'Thank you for your business!'
  });

  // Task state
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [taskForm, setTaskForm] = useState<Omit<ErpTask, 'id'>>({
    title: '',
    project: '',
    assignedTo: 'Bijaya Tamang',
    priority: 'high',
    status: 'todo',
    deadline: ''
  });

  // Expense state
  const [isCreatingExpense, setIsCreatingExpense] = useState(false);
  const [expenseForm, setExpenseForm] = useState<Omit<ExpenseItem, 'id'>>({
    category: 'Hosting & Cloud',
    description: '',
    amount: 50,
    date: new Date().toISOString().slice(0, 10),
    receiptUrl: ''
  });

  // Financial calculations
  const totalInvoiced = data.invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const totalPaid = data.invoices
    .filter(inv => inv.status === 'paid')
    .reduce((acc, inv) => acc + inv.amount, 0);
  const totalExpenses = data.expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netRevenue = totalPaid - totalExpenses;

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateErpProject(editingProject.id, projectForm);
      setEditingProject(null);
    } else {
      addErpProject(projectForm);
      setIsCreatingProject(false);
    }
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingInvoice) {
      updateInvoice(editingInvoice.id, invoiceForm);
      setEditingInvoice(null);
    } else {
      addInvoice(invoiceForm);
      setIsCreatingInvoice(false);
    }
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    addErpTask(taskForm);
    setIsCreatingTask(false);
    setTaskForm({
      title: '',
      project: '',
      assignedTo: 'Bijaya Tamang',
      priority: 'high',
      status: 'todo',
      deadline: ''
    });
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense(expenseForm);
    setIsCreatingExpense(false);
    setExpenseForm({
      category: 'Hosting & Cloud',
      description: '',
      amount: 50,
      date: new Date().toISOString().slice(0, 10),
      receiptUrl: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Paid Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            ${totalPaid.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Invoiced: ${totalInvoiced.toLocaleString()}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Operating Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-red-400 font-mono mt-1">
            ${totalExpenses.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Items: {data.expenses.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Net Profit Margin</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF7A29]/15 text-[#FF7A29] flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            ${netRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#FF7A29] font-medium">
            {totalPaid > 0 ? Math.round((netRevenue / totalPaid) * 100) : 0}% Net
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Active ERP Projects</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {data.erpProjects.filter(p => p.status === 'in-progress').length}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Total: {data.erpProjects.length} Projects</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#080D22] border border-indigo-900/50 rounded-2xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#FF7A29] text-white shadow-md shadow-[#FF7A29]/20'
                : 'bg-indigo-950/60 text-slate-300 hover:text-white'
            }`}
          >
            ERP Projects ({data.erpProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'invoices'
                ? 'bg-[#FF7A29] text-white shadow-md shadow-[#FF7A29]/20'
                : 'bg-indigo-950/60 text-slate-300 hover:text-white'
            }`}
          >
            Invoices & Billing ({data.invoices.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-[#FF7A29] text-white shadow-md shadow-[#FF7A29]/20'
                : 'bg-indigo-950/60 text-slate-300 hover:text-white'
            }`}
          >
            Tasks & Sprints ({data.erpTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'expenses'
                ? 'bg-[#FF7A29] text-white shadow-md shadow-[#FF7A29]/20'
                : 'bg-indigo-950/60 text-slate-300 hover:text-white'
            }`}
          >
            Expenses ({data.expenses.length})
          </button>
        </div>

        <div>
          {activeTab === 'projects' && (
            <button
              onClick={() => {
                setProjectForm({
                  title: '',
                  clientName: '',
                  status: 'in-progress',
                  budget: 3500,
                  spent: 0,
                  startDate: new Date().toISOString().slice(0, 10),
                  deadline: '',
                  progressPercent: 10,
                  milestones: [
                    { id: 'm-1', title: 'Requirements & Scope', dueDate: '', completed: true },
                    { id: 'm-2', title: 'Backend Development', dueDate: '', completed: false },
                    { id: 'm-3', title: 'Testing & Handover', dueDate: '', completed: false }
                  ],
                  notes: ''
                });
                setEditingProject(null);
                setIsCreatingProject(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create ERP Project</span>
            </button>
          )}

          {activeTab === 'invoices' && (
            <button
              onClick={() => {
                setInvoiceForm({
                  invoiceNumber: 'INV-' + (Math.floor(Math.random() * 9000) + 1000),
                  clientName: '',
                  clientEmail: '',
                  amount: 1500,
                  currency: 'USD',
                  status: 'pending',
                  issueDate: new Date().toISOString().slice(0, 10),
                  dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
                  items: [
                    { id: 'item-1', description: 'Full-Stack Web Development', quantity: 1, unitPrice: 1500, total: 1500 }
                  ],
                  notes: ''
                });
                setEditingInvoice(null);
                setIsCreatingInvoice(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate Invoice</span>
            </button>
          )}

          {activeTab === 'tasks' && (
            <button
              onClick={() => setIsCreatingTask(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Sprint Task</span>
            </button>
          )}

          {activeTab === 'expenses' && (
            <button
              onClick={() => setIsCreatingExpense(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Expense</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tab 1: ERP Projects */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.erpProjects.map(proj => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-[#080D22] border border-indigo-900/60 hover:border-indigo-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      proj.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : proj.status === 'in-progress'
                        ? 'bg-blue-950 text-blue-400 border border-blue-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {proj.status.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#FF7A29]">
                    Budget: ${proj.budget.toLocaleString()}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">{proj.title}</h4>
                <div className="text-xs text-indigo-300 font-semibold mb-3">Client: {proj.clientName}</div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Milestone Progress</span>
                    <span className="font-mono text-white font-bold">{proj.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#060A18] h-2 rounded-full overflow-hidden border border-indigo-950">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-[#FF7A29] h-full rounded-full transition-all duration-300"
                      style={{ width: `${proj.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Milestones Checklist */}
                <div className="space-y-1.5 bg-[#060A1A] p-3 rounded-xl border border-indigo-950/80">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                    Key Milestones ({proj.milestones.filter(m => m.completed).length}/{proj.milestones.length})
                  </span>
                  {proj.milestones.map(m => (
                    <button
                      key={m.id}
                      onClick={() => toggleMilestone(proj.id, m.id)}
                      className="w-full flex items-center gap-2 text-left text-xs text-slate-300 hover:text-white py-0.5 cursor-pointer"
                    >
                      {m.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span className={m.completed ? 'line-through text-slate-500' : 'text-slate-200'}>
                        {m.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-indigo-950 flex items-center justify-between text-xs text-slate-400">
                <span>Deadline: {proj.deadline || 'Flexible'}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setProjectForm({
                        title: proj.title,
                        clientName: proj.clientName,
                        status: proj.status,
                        budget: proj.budget,
                        spent: proj.spent,
                        startDate: proj.startDate,
                        deadline: proj.deadline || '',
                        progressPercent: proj.progressPercent,
                        milestones: proj.milestones,
                        notes: proj.notes || ''
                      });
                      setEditingProject(proj);
                      setIsCreatingProject(true);
                    }}
                    className="p-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-slate-300 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this ERP project?')) deleteErpProject(proj.id);
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
      )}

      {/* Sub-Tab 2: Invoices */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.invoices.map(inv => (
              <div
                key={inv.id}
                className="p-4 rounded-2xl bg-[#080D22] border border-indigo-900/60 hover:border-indigo-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-white">{inv.invoiceNumber}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === 'paid'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : inv.status === 'overdue'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {inv.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xl font-bold font-mono text-[#FF7A29] mb-1">
                    ${inv.amount.toLocaleString()} {inv.currency}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">{inv.clientName}</h4>
                  <p className="text-xs text-slate-400 truncate">{inv.clientEmail}</p>

                  <div className="mt-3 text-[11px] text-slate-400 space-y-0.5 bg-[#060A18] p-2.5 rounded-xl border border-indigo-950">
                    <div>Issued: {inv.issueDate}</div>
                    <div>Due: {inv.dueDate}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-950 flex items-center justify-between gap-2">
                  <select
                    value={inv.status}
                    onChange={(e) => markInvoiceStatus(inv.id, e.target.value as any)}
                    className="px-2 py-1 rounded-lg bg-[#0E1538] border border-indigo-800 text-[11px] text-slate-200"
                  >
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        if (confirm('Delete this invoice?')) deleteInvoice(inv.id);
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

      {/* Sub-Tab 3: Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-3">
          <div className="divide-y divide-indigo-950/80 rounded-2xl bg-[#080D22] border border-indigo-900/60 overflow-hidden">
            {data.erpTasks.map(task => (
              <div
                key={task.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-[#0A102A] transition-colors"
              >
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className="flex items-center gap-3 text-left cursor-pointer flex-1"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                  <div>
                    <h5
                      className={`text-sm font-semibold ${
                        task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}
                    >
                      {task.title}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>Project: {task.project}</span>
                      <span>•</span>
                      <span className="text-[#FF7A29]">Priority: {task.priority}</span>
                      {task.deadline && (
                        <>
                          <span>•</span>
                          <span>Due: {task.deadline}</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => deleteErpTask(task.id)}
                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/70 text-red-400 hover:text-white transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Expenses */}
      {activeTab === 'expenses' && (
        <div className="space-y-3">
          <div className="divide-y divide-indigo-950/80 rounded-2xl bg-[#080D22] border border-indigo-900/60 overflow-hidden">
            {data.expenses.map(exp => (
              <div
                key={exp.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-[#0A102A] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{exp.description}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] bg-indigo-950 text-indigo-300 font-mono">
                      {exp.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Date: {exp.date}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-base font-bold font-mono text-red-400">
                    -${exp.amount.toLocaleString()}
                  </div>
                  <button
                    onClick={() => deleteExpense(exp.id)}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/70 text-red-400 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals for Task, Project, Invoice, Expense */}
      {isCreatingProject && (
        <div
          onClick={() => setIsCreatingProject(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0D122B] border border-indigo-700/60 rounded-3xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-base font-bold text-white mb-4">
              {editingProject ? 'Edit ERP Project' : 'Create New ERP Project'}
            </h3>
            <form onSubmit={handleSaveProject} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={projectForm.clientName}
                    onChange={(e) => setProjectForm({ ...projectForm, clientName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({ ...projectForm, budget: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On-Hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={projectForm.deadline}
                    onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingProject(false)}
                  className="px-4 py-2 rounded-xl bg-indigo-950 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCreatingTask && (
        <div
          onClick={() => setIsCreatingTask(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0D122B] border border-indigo-700/60 rounded-3xl p-6 shadow-2xl text-slate-100"
          >
            <h3 className="text-base font-bold text-white mb-4">Add Task</h3>
            <form onSubmit={handleSaveTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  placeholder="e.g. Implement Stripe webhook listener"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project</label>
                  <input
                    type="text"
                    required
                    value={taskForm.project}
                    onChange={(e) => setTaskForm({ ...taskForm, project: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deadline</label>
                <input
                  type="date"
                  value={taskForm.deadline}
                  onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingTask(false)}
                  className="px-4 py-2 rounded-xl bg-indigo-950 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCreatingExpense && (
        <div
          onClick={() => setIsCreatingExpense(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0D122B] border border-indigo-700/60 rounded-3xl p-6 shadow-2xl text-slate-100"
          >
            <h3 className="text-base font-bold text-white mb-4">Record Expense</h3>
            <form onSubmit={handleSaveExpense} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  placeholder="e.g. AWS Cloud Infrastructure Hosting"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                  >
                    <option value="Hosting & Cloud">Hosting & Cloud</option>
                    <option value="Software Subscriptions">Software & Tools</option>
                    <option value="Hardware & Gear">Hardware & Gear</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={expenseForm.date}
                  onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080B1C] border border-indigo-900/80 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingExpense(false)}
                  className="px-4 py-2 rounded-xl bg-indigo-950 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white text-xs font-bold shadow-md"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
