import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import {
  X,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Tag,
  Camera,
  Layers
} from 'lucide-react';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  allItems: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  allItems,
  onClose,
  onSelect
}) => {
  if (!item) return null;

  const currentIndex = allItems.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    onSelect(allItems[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allItems.length;
    onSelect(allItems[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, allItems]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl animate-fadeIn text-white select-none"
      id="gallery-lightbox-overlay"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-black/40 border-b border-white/10 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF7A29]/20 flex items-center justify-center text-[#FF7A29]">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="text-[#FF7A29]">{item.category}</span>
              <span>•</span>
              <span className="text-indigo-300">{item.resolution}</span>
              <span>•</span>
              <span>{currentIndex + 1} of {allItems.length}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={item.highResUrl || item.imageUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
            title="Open full resolution in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all z-20 cursor-pointer shadow-xl hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all z-20 cursor-pointer shadow-xl hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* The High-Resolution Image */}
        <div className="max-w-5xl max-h-[75vh] flex items-center justify-center relative shadow-2xl rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
          <img
            src={item.highResUrl || item.imageUrl}
            alt={item.title}
            className="max-h-[75vh] w-auto object-contain transition-all duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Bottom Metadata & Info Bar */}
      <div className="px-4 sm:px-8 py-4 bg-black/70 border-t border-white/10 backdrop-blur-md z-20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {item.description}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/40 text-indigo-300 text-[10px] font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 font-mono text-xs font-bold">
              {item.resolution}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
