import React, { useState } from 'react';
import { BlogPost } from '../../../types';
import { ImageUploadField } from '../../common/ImageUploadField';
import {
  X,
  Save,
  BookOpen,
  Calendar,
  Clock,
  User,
  Tag,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface BlogEditModalProps {
  post: BlogPost | null; // null means creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<BlogPost, 'id' | 'views'>) => void;
}

export const BlogEditModal: React.FC<BlogEditModalProps> = ({
  post,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(
    post?.content ||
      '# Introduction\nModern web architectures require scalable backend systems paired with pixel-perfect client interfaces.\n\n## Key Architectural Decisions\n1. **Edge Rendering**: Faster initial paint\n2. **Type-Safe API Contracts**: Zero-overhead validation\n3. **Modular State Layers**: Clean unidirectional state\n\n```typescript\nexport const configureSystem = () => {\n  return { status: "optimized" };\n};\n```\n\n## Conclusion\nContinuous benchmarking and real-world user metrics are the ultimate test for production engineering.'
  );
  const [coverImage, setCoverImage] = useState(
    post?.coverImage ||
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
  );
  const [tagsText, setTagsText] = useState(
    post?.tags?.join(', ') || 'Architecture, Full-Stack, TypeScript'
  );
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt || 'September 2026'
  );
  const [readTime, setReadTime] = useState(post?.readTime || '6 min read');
  const [author, setAuthor] = useState(post?.author || 'Bijaya Tamang');
  const [isPublished, setIsPublished] = useState<boolean>(
    post?.isPublished ?? true
  );

  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'meta'>('content');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: excerpt.trim(),
      content: content.trim(),
      coverImage,
      tags,
      publishedAt: publishedAt.trim(),
      readTime: readTime.trim(),
      author: author.trim(),
      isPublished
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#161922] border border-[#2A3144] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#1C212E] border-b border-[#2A3144] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3E60D5]/20 border border-[#3E60D5]/40 flex items-center justify-center text-[#60A5FA]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {post ? `Edit Article: ${post.title}` : 'Write & Publish New Technical Article'}
              </h2>
              <p className="text-[11px] text-slate-400">
                CRUD content authoring with URL, drag & drop, and browser file image support.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#252C3D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="px-5 pt-3 bg-[#161922] border-b border-[#252C3D] flex gap-2 shrink-0">
          {[
            { id: 'content', label: '1. Article Content & Markdown' },
            { id: 'media', label: '2. Cover Banner (Upload/Drag/URL)' },
            { id: 'meta', label: '3. Tags, Author & Metadata' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#3E60D5] text-white font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Article Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Architecting Scalable Cloud Microservices in 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-bold focus:outline-none focus:border-[#3E60D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Excerpt / Teaser <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A high-level summary that appears on blog index cards..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    Full Article Content (Markdown format) <span className="text-red-400">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Supports # Headings, **bold**, lists, and ```code blocks
                  </span>
                </div>
                <textarea
                  rows={10}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write in Markdown format..."
                  className="w-full p-3.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5] leading-relaxed resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-4">
              <ImageUploadField
                label="Article Feature / Cover Image"
                description="Upload an image via drag and drop, browse your local drive, paste any image URL, or choose a curated developer preset."
                value={coverImage}
                onChange={(url) => setCoverImage(url)}
                required
              />
            </div>
          )}

          {activeTab === 'meta' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="React, TypeScript, Architecture, Django, API"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5]"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tagsText
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#1C2232] text-[#60A5FA] text-[10px] font-mono border border-[#2E374D]"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Read Time Estimate</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Publish Date</label>
                  <input
                    type="text"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    placeholder="e.g. September 2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#10131A] rounded-xl border border-[#272D3D]">
                <input
                  type="checkbox"
                  id="published-toggle"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-[#3E60D5] accent-[#3E60D5] cursor-pointer"
                />
                <label htmlFor="published-toggle" className="text-xs text-slate-300 cursor-pointer flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isPublished ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>Publish immediately to live portfolio blog section</span>
                </label>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#2A3144] flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#232838] hover:bg-[#2c3246] text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#3E60D5]/25 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{post ? 'Update Article' : 'Publish Article'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
