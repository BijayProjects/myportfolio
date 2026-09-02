import React from 'react';
import { BlogPost } from '../types';
import {
  X,
  Calendar,
  Clock,
  User,
  Share2,
  Tag,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Copy
} from 'lucide-react';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn" id="blog-detail-modal-overlay">
      <div className="relative w-full max-w-3xl bg-[#0C1129] border border-indigo-800/60 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col" id="blog-modal-container">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080C1E] border-b border-indigo-950 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#FF7A29]/15 text-[#FF7A29] font-mono text-xs font-bold border border-[#FF7A29]/30">
              Tech Article
            </span>
            <span className="text-slate-400 text-xs font-mono hidden sm:inline">•</span>
            <span className="text-slate-300 text-xs font-mono hidden sm:inline">{post.readTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/50 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Copy share link"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Post Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Author & Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-3 border-t border-indigo-950">
              <div className="flex items-center gap-1.5 text-slate-200">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF7A29]" />
                <span>{post.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="rounded-xl overflow-hidden aspect-[21/9] bg-slate-950 border border-indigo-900/40">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Excerpt Lead */}
          <div className="p-4 rounded-xl bg-[#080C1E] border border-indigo-950 text-slate-200 text-sm font-medium italic leading-relaxed">
            "{post.excerpt}"
          </div>

          {/* Body Content */}
          <div className="text-slate-300 text-sm leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {post.content}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-indigo-950">
            <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Related Topics:</div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-800/50 text-indigo-300 font-mono text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080C1E] border-t border-indigo-950 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Published on Bijaya Tamang Tech Journal
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#FF7A29] hover:bg-[#ff6912] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
