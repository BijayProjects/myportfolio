import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Logo } from '../Logo';
import { Lock, User, KeyRound, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface AdminAuthScreenProps {
  onBackToSite?: () => void;
}

export const AdminAuthScreen: React.FC<AdminAuthScreenProps> = ({ onBackToSite }) => {
  const { adminLogin } = usePortfolio();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Please enter your admin username.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter the master password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = adminLogin(username, password);
      setIsLoading(false);
      if (!success) {
        setError('Invalid username or password. Please verify and try again.');
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#13161F]/95 backdrop-blur-xl select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3E60D5]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#1D212E] border border-[#272D3D] rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100">
        {/* Header Icon */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <Logo size="lg" showSubtitle={false} animated={false} />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#1D212E] flex items-center justify-center text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <h2 className="text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
              <span className="text-indigo-400 font-extrabold">Bijaya</span>
              <span className="text-[#FF7A29] font-extrabold">Tamang</span>
            </h2>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#3E60D5]/30 text-[#688AF5] font-mono border border-[#3E60D5]/40 font-semibold">
              Admin
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Sign in to access CMS, CRM, ERP & Dashboard Analytics
          </p>
        </div>

        {/* Login Form with Username and Password */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Admin Username</span>
              <span className="text-[10px] text-slate-500 font-mono">Default: admin</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4 text-[#3E60D5]" />
              </div>
              <input
                id="admin-username-input"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter admin username..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none focus:ring-1 focus:ring-[#3E60D5] text-white text-sm transition-all placeholder:text-slate-600"
                autoFocus
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Master Password</span>
              <span className="text-[10px] text-slate-500 font-mono">Default: admin123</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <KeyRound className="w-4 h-4 text-[#3E60D5]" />
              </div>
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter master password..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none focus:ring-1 focus:ring-[#3E60D5] text-white text-sm transition-all placeholder:text-slate-600"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            id="admin-login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white font-bold text-sm shadow-lg shadow-[#3E60D5]/25 hover:shadow-[#3E60D5]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Unlock Taplox Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to site action */}
        {onBackToSite && (
          <div className="mt-6 pt-5 border-t border-[#272D3D] text-center">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Portfolio</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
