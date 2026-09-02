import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GalleryItem, GalleryCategory } from '../types';
import { GalleryLightbox } from './GalleryLightbox';
import {
  Camera,
  Maximize2,
  Sliders,
  Sparkles,
  Layers,
  ZoomIn,
  Eye,
  Plus
} from 'lucide-react';

export const HighResGallery: React.FC = () => {
  const { data, selectedGalleryItem, setSelectedGalleryItem, setIsCMSOpen, setCmsTab } = usePortfolio();
  const { gallery } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: string[] = ['All', 'Web Apps', 'WordPress', 'AI Systems', 'UI/UX Mockups', 'Architecture'];

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 relative bg-[#090D1F] border-t border-indigo-950/70">
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#FF7A29]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A3A] border border-indigo-800/50 text-xs font-mono text-[#FF7A29] mb-3">
              <Camera className="w-3.5 h-3.5 text-[#FF7A29]" />
              <span>High-Resolution Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A29] to-amber-300">Design & Architecture</span> Gallery
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
              High-resolution captures of responsive web applications, backend schema diagrams, WordPress UI designs, and AI node workflows.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-indigo-950/80" id="gallery-category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF7A29] to-[#FA5D00] text-white shadow-md shadow-[#FF7A29]/25 scale-105'
                  : 'bg-[#0E132D] text-slate-300 hover:text-white hover:bg-indigo-950/80 border border-indigo-900/40'
              }`}
            >
              {cat}
              {cat === 'All' && ` (${gallery.length})`}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-items-grid">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#0C1129] border border-indigo-900/40 hover:border-[#FF7A29]/60 shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5"
              id={`gallery-item-${item.id}`}
            >
              {/* Image Container */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D1A] via-[#090D1A]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Resolution Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-emerald-400 font-mono text-[10px] font-bold">
                    {item.resolution}
                  </span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-[#FF7A29]/90 backdrop-blur-md text-white font-mono text-[10px] font-bold shadow">
                    {item.category}
                  </span>
                </div>

                {/* Hover Center Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-[#FF7A29]/90 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Content within Card */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                  <h3 className="text-base font-bold text-white group-hover:text-[#FF7A29] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-slate-300 text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/40 text-indigo-300 font-mono text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-16 bg-[#0C1129] rounded-2xl border border-indigo-900/40 p-8">
            <Camera className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white">No images in this category</h4>
            <p className="text-xs text-slate-400 mt-1">High-resolution items will be posted here soon.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedGalleryItem && (
        <GalleryLightbox
          item={selectedGalleryItem}
          allItems={filteredGallery}
          onClose={() => setSelectedGalleryItem(null)}
          onSelect={(item) => setSelectedGalleryItem(item)}
        />
      )}
    </section>
  );
};
