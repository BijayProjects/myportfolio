import React from 'react';
import { Logo } from '../Logo';
import {
  Lock,
  User,
  Mail,
  KeyRound,
  ArrowRight,
  AlertTriangle,
  ServerCrash,
  RefreshCw,
  Home
} from 'lucide-react';

interface TaploxAuthPreviewsProps {
  view: 'auth-signin' | 'auth-signup' | 'auth-reset' | 'auth-lock' | 'error-404' | 'error-500';
  onNavigateHome: () => void;
}

export const TaploxAuthPreviews: React.FC<TaploxAuthPreviewsProps> = ({ view, onNavigateHome }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      {/* AUTH PREVIEWS */}
      {view.startsWith('auth-') && (
        <div className="w-full max-w-md bg-[#1D212E] border border-[#272D3D] rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <Logo size="md" showSubtitle={false} animated={false} />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {view === 'auth-signin' && 'Sign In to Bijaya Studio'}
              {view === 'auth-signup' && 'Create Studio Account'}
              {view === 'auth-reset' && 'Reset Your Password'}
              {view === 'auth-lock' && 'Screen Locked'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {view === 'auth-signin' && 'Enter your admin credentials to access workspace'}
              {view === 'auth-signup' && 'Register your profile to collaborate on studio projects'}
              {view === 'auth-reset' && 'Enter your email to receive recovery instructions'}
              {view === 'auth-lock' && 'Enter master password to unlock active session'}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-xs">
            {view === 'auth-signup' && (
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Bijaya Tamang"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] text-white text-sm"
                />
              </div>
            )}

            {(view === 'auth-signin' || view === 'auth-signup' || view === 'auth-reset') && (
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Email / Username</label>
                <input
                  type="text"
                  placeholder="admin or bijay2310tamang@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] text-white text-sm"
                />
              </div>
            )}

            {(view === 'auth-signin' || view === 'auth-signup' || view === 'auth-lock') && (
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] text-white text-sm"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {view === 'auth-signin' && 'Sign In'}
                {view === 'auth-signup' && 'Create Account'}
                {view === 'auth-reset' && 'Send Reset Link'}
                {view === 'auth-lock' && 'Unlock Screen'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ERROR 404 */}
      {view === 'error-404' && (
        <div className="text-center max-w-md bg-[#1D212E] border border-[#272D3D] rounded-3xl p-8 shadow-2xl space-y-4">
          <div className="text-6xl font-black text-[#3E60D5] tracking-widest font-mono">404</div>
          <h2 className="text-xl font-bold text-white">Page Not Found</h2>
          <p className="text-xs text-slate-400">
            The requested module or resource could not be located in this Taplox session.
          </p>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold"
          >
            <Home className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      )}

      {/* ERROR 500 */}
      {view === 'error-500' && (
        <div className="text-center max-w-md bg-[#1D212E] border border-[#272D3D] rounded-3xl p-8 shadow-2xl space-y-4">
          <div className="text-6xl font-black text-red-400 tracking-widest font-mono">500</div>
          <h2 className="text-xl font-bold text-white">Internal Server Error</h2>
          <p className="text-xs text-slate-400">
            Something went wrong on the server runtime. Local backup state is intact.
          </p>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Dashboard</span>
          </button>
        </div>
      )}
    </div>
  );
};
