import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, KeyRound, Check, ShieldAlert, Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface AdminPasswordChangeModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const AdminPasswordChangeModal: React.FC<AdminPasswordChangeModalProps> = ({
  onClose
}) => {
  const { adminUsername, changeAdminCredentials } = usePortfolio();
  const [newUsername, setNewUsername] = useState(adminUsername);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    setNewUsername(adminUsername);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setFeedback(null);
  }, [adminUsername]);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!currentPassword) {
      setFeedback({ type: 'error', message: 'Current master password is required to save changes.' });
      return;
    }

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setFeedback({ type: 'error', message: 'New passwords do not match.' });
        return;
      }
      if (newPassword.length < 4) {
        setFeedback({ type: 'error', message: 'New password must be at least 4 characters long.' });
        return;
      }
    }

    if (newUsername.trim().length < 3) {
      setFeedback({ type: 'error', message: 'Username must be at least 3 characters long.' });
      return;
    }

    const res = changeAdminCredentials(
      currentPassword,
      newUsername.trim() !== adminUsername ? newUsername.trim() : undefined,
      newPassword.trim() ? newPassword.trim() : undefined
    );

    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setTimeout(() => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      }, 1500);
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#1D212E] border border-[#272D3D] rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#161922] hover:bg-[#202538] text-slate-400 hover:text-white transition-colors cursor-pointer border border-[#272D3D]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#232A42] flex items-center justify-center text-[#3E60D5] border border-[#2C3454]">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Admin Credentials Settings</h3>
            <p className="text-xs text-slate-400">Update username and master password</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Change Username */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>Admin Username</span>
              <span className="text-[10px] text-slate-500">Current: {adminUsername}</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4 text-[#3E60D5]" />
              </div>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                minLength={3}
                placeholder="Enter admin username..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
              />
            </div>
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Current Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password to verify..."
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                tabIndex={-1}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password (Optional) */}
          <div className="pt-2 border-t border-[#272D3D]">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              New Password <span className="text-slate-500 font-normal">(leave blank to keep current)</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={4}
                placeholder="Enter new password (min 4 chars)..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                tabIndex={-1}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {newPassword && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type={showNew ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={4}
                placeholder="Re-type new password..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#161922] border border-[#272D3D] focus:border-[#3E60D5] focus:outline-none text-white text-sm"
              />
            </div>
          )}

          {feedback && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
                  : 'bg-red-950/60 border-red-800/80 text-red-300'
              }`}
            >
              {feedback.type === 'success' ? (
                <Check className="w-4 h-4 shrink-0" />
              ) : (
                <ShieldAlert className="w-4 h-4 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#161922] hover:bg-[#202538] text-slate-300 text-xs font-semibold cursor-pointer border border-[#272D3D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold shadow-md shadow-[#3E60D5]/20 cursor-pointer"
            >
              Save Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
