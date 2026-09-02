import React, { useState } from 'react';
import {
  Component,
  BarChart2,
  FileText,
  Table as TableIcon,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Copy,
  Check,
  Send,
  Eye,
  Sliders,
  Layers,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

interface TaploxUIKitViewProps {
  section: 'uikit-base' | 'uikit-charts' | 'uikit-forms' | 'uikit-tables' | 'uikit-icons' | 'uikit-maps';
}

export const TaploxUIKitView: React.FC<TaploxUIKitViewProps> = ({ section }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toggleVal, setToggleVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(65);
  const [selectedRadio, setSelectedRadio] = useState('option1');

  const copyCode = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {section === 'uikit-base' && 'Base UI Components'}
            {section === 'uikit-charts' && 'Apex Charts Showcase'}
            {section === 'uikit-forms' && 'Forms & Input Elements'}
            {section === 'uikit-tables' && 'Data Tables & Lists'}
            {section === 'uikit-icons' && 'Icons Library'}
            {section === 'uikit-maps' && 'Interactive Vector Maps'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Taplox Design System & Component Library
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Taplox</span>
          <span>›</span>
          <span>UI Kit</span>
          <span>›</span>
          <span className="text-slate-200 font-medium capitalize">{section.replace('uikit-', '')}</span>
        </div>
      </div>

      {/* BASE UI SECTION */}
      {section === 'uikit-base' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Buttons showcase */}
          <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Buttons & Styles</span>
              <span className="text-[10px] text-slate-400 font-mono">Taplox Buttons</span>
            </h3>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2.5">
                <button className="px-4 py-2 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-semibold shadow-sm transition-colors">
                  Primary Button
                </button>
                <button className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold shadow-sm transition-colors">
                  Success Button
                </button>
                <button className="px-4 py-2 rounded-xl bg-[#EF4444] hover:bg-[#dc2626] text-white text-xs font-semibold shadow-sm transition-colors">
                  Danger Button
                </button>
                <button className="px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#d97706] text-white text-xs font-semibold shadow-sm transition-colors">
                  Warning Button
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button className="px-4 py-2 rounded-xl bg-[#232A42] hover:bg-[#2e3757] text-[#3E60D5] text-xs font-semibold border border-[#3E60D5]/40 transition-colors">
                  Soft Primary
                </button>
                <button className="px-4 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 text-xs font-semibold border border-emerald-800/60 transition-colors">
                  Soft Success
                </button>
                <button className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-400 text-xs font-semibold border border-red-800/60 transition-colors">
                  Soft Danger
                </button>
                <button className="px-4 py-2 rounded-xl border border-[#272D3D] hover:bg-[#161922] text-slate-300 text-xs font-semibold transition-colors">
                  Outline Neutral
                </button>
              </div>
            </div>
          </div>

          {/* Badges and Chips */}
          <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Badges, Pills & Indicators</span>
              <span className="text-[10px] text-slate-400 font-mono">Status System</span>
            </h3>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#3E60D5] text-white text-xs font-semibold">
                  Primary Pill
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold">
                  Active Verified
                </span>
                <span className="px-2.5 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold">
                  Pro Feature
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
                  Pending
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#232A42] border border-[#2C3454] text-[#3E60D5] text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E60D5]" />
                  Processing Order
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-800 text-red-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Blocked Access
                </span>
              </div>
            </div>
          </div>

          {/* Alert Notifications */}
          <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm space-y-3 lg:col-span-2">
            <h3 className="text-sm font-bold text-white">System Alerts & Banners</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#232A42] border border-[#3E60D5]/50 text-slate-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#3E60D5] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#60A5FA]">System Updated</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Admin CMS v2.4 initialized with live real-time synchronization.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-400">Database Synchronized</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">All portfolio articles, projects and leads saved locally.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-slate-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-400">Security Check</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Master password configured with encryption security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APEX CHARTS SECTION */}
      {section === 'uikit-charts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Chart 1: Growth Velocity */}
          <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Visitor & Lead Growth (Apex Area)</span>
              <span className="text-xs text-emerald-400 font-semibold">+34.2%</span>
            </h3>

            <div className="h-48 flex items-end gap-2 pt-6">
              {[35, 45, 60, 50, 75, 90, 85, 95, 110, 125, 140, 160].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full bg-gradient-to-t from-[#3E60D5] to-[#727CF5] rounded-t-lg group-hover:brightness-125 transition-all"
                    style={{ height: `${(h / 160) * 100}%` }}
                  />
                  <span className="text-[9px] text-slate-500 font-mono">{i + 1}M</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2: Conversion Channels */}
          <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Traffic Sources (Apex Donut)</span>
              <span className="text-xs text-slate-400 font-mono">100% Split</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 items-center h-48">
              <div className="relative w-32 h-32 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#272D3D"
                    strokeWidth="3.8"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3E60D5"
                    strokeWidth="3.8"
                    strokeDasharray="45, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.8"
                    strokeDasharray="30, 100"
                    strokeDashoffset="-45"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3.8"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-75"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-white">15.3k</span>
                  <span className="text-[9px] text-slate-400">Total Visits</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#3E60D5]" />
                    Direct & GitHub
                  </span>
                  <span className="font-bold text-white">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    LinkedIn Leads
                  </span>
                  <span className="font-bold text-white">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    Organic Search
                  </span>
                  <span className="font-bold text-white">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FORMS SECTION */}
      {section === 'uikit-forms' && (
        <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-white">Interactive Form Controls & Validations</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Text Input</label>
              <input
                type="text"
                placeholder="Standard text field..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Dropdown Selector</label>
              <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm">
                <option>Full-Stack Application</option>
                <option>Mobile App (React Native)</option>
                <option>UI/UX Architecture</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Slider Range: {sliderVal}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full accent-[#3E60D5]"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-semibold text-slate-200">Interactive Toggle Switch</p>
                <p className="text-[11px] text-slate-400">Enable real-time notification alerts</p>
              </div>
              <button
                type="button"
                onClick={() => setToggleVal(!toggleVal)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  toggleVal ? 'bg-[#3E60D5]' : 'bg-[#272D3D]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    toggleVal ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLES SECTION */}
      {section === 'uikit-tables' && (
        <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-white">Taplox Data Table Preview</h3>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#272D3D] text-slate-400 font-semibold">
                  <th className="pb-3">Feature Name</th>
                  <th className="pb-3">Module</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#272D3D]/60 text-slate-300">
                <tr className="hover:bg-[#161922]/50">
                  <td className="py-3 font-semibold text-white">Interactive CMS Hub</td>
                  <td className="py-3 text-slate-400">Portfolio Core</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px]">
                      Operational
                    </span>
                  </td>
                  <td className="py-3 text-right text-[#3E60D5] font-semibold hover:underline cursor-pointer">
                    Manage
                  </td>
                </tr>
                <tr className="hover:bg-[#161922]/50">
                  <td className="py-3 font-semibold text-white">CRM Leads Pipeline</td>
                  <td className="py-3 text-slate-400">Sales Ops</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px]">
                      Operational
                    </span>
                  </td>
                  <td className="py-3 text-right text-[#3E60D5] font-semibold hover:underline cursor-pointer">
                    Manage
                  </td>
                </tr>
                <tr className="hover:bg-[#161922]/50">
                  <td className="py-3 font-semibold text-white">ERP Milestone Tracker</td>
                  <td className="py-3 text-slate-400">Finance & Sprints</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-md bg-[#232A42] border border-[#2C3454] text-[#60A5FA] text-[10px]">
                      Active Sprint
                    </span>
                  </td>
                  <td className="py-3 text-right text-[#3E60D5] font-semibold hover:underline cursor-pointer">
                    Manage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ICONS & MAPS */}
      {(section === 'uikit-icons' || section === 'uikit-maps') && (
        <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-white">
            {section === 'uikit-icons' ? 'Icons Library' : 'Interactive Maps Preview'}
          </h3>
          <p className="text-xs text-slate-400">
            {section === 'uikit-icons'
              ? 'Over 500+ Lucide vector icons configured across the Taplox theme.'
              : 'Global geographic analytics and vector coordinates mapped across regions.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
            {[
              { icon: Sparkles, name: 'Sparkles' },
              { icon: BarChart2, name: 'Analytics' },
              { icon: TableIcon, name: 'Tables' },
              { icon: FileText, name: 'Forms' },
              { icon: MapPin, name: 'Location' },
              { icon: Heart, name: 'Likes' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#161922] border border-[#272D3D] flex flex-col items-center gap-2 hover:border-[#3E60D5] transition-all cursor-pointer text-center"
              >
                <item.icon className="w-5 h-5 text-[#3E60D5]" />
                <span className="text-[11px] text-slate-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
