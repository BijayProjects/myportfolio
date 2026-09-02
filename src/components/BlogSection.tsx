import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BlogPost } from '../types';
import { BlogDetailModal } from './BlogDetailModal';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sliders,
  Plus,
  Sparkles,
  Eye
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { data, selectedBlog, setSelectedBlog, setIsCMSOpen, setCmsTab } = usePortfolio();
  const { blogPosts } = data;

  const publishedPosts = blogPosts.filter((p) => p.isPublished);

  return (
    <section id="blog" className="py-20 relative bg-[#070A18]/80 border-t border-indigo-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A3A] border border-indigo-800/50 text-xs font-mono text-[#FF7A29] mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#FF7A29]" />
              <span>Technical Insights & Engineering Notes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A29] to-amber-300">Blog Posts</span> & Articles
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
              Practical write-ups on Python Django performance, custom WordPress development, and AI prompt engineering workflows.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" id="blog-posts-grid">
          {publishedPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedBlog(post)}
              className="group bg-[#0C1129] border border-indigo-900/40 hover:border-[#FF7A29]/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              id={`blog-post-card-${post.id}`}
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1129] via-transparent to-transparent opacity-80" />

                  {/* Read Time Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-indigo-300 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FF7A29]" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Date & Author */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2.5">
                    <span className="text-[#FF7A29]">{post.publishedAt}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF7A29] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#131938] border border-indigo-950 text-indigo-300 font-mono text-[11px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Read Action */}
              <div className="p-5 pt-0 sm:p-6 sm:pt-0 border-t border-indigo-950/60 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 group-hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF7A29] group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {post.views ? `${post.views} reads` : 'New'}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {publishedPosts.length === 0 && (
          <div className="text-center py-16 bg-[#0C1129] rounded-2xl border border-indigo-900/40 p-8">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white">No published blog posts</h4>
            <p className="text-xs text-slate-400 mt-1">Articles and technical insights will appear here.</p>
          </div>
        )}
      </div>

      {/* Blog Full Reading Modal */}
      {selectedBlog && (
        <BlogDetailModal
          post={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </section>
  );
};
