import React, { useState } from 'react';
import { GalleryItem, GalleryCategory } from '../../../types';
import { ImageUploadField } from '../../common/ImageUploadField';
import {
  X,
  Save,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Maximize2,
  Calendar
} from 'lucide-react';

interface GalleryEditModalProps {
  item: GalleryItem | null; // null means creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<GalleryItem, 'id'>) => void;
}

export const GalleryEditModal: React.FC<GalleryEditModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(item?.title || '');
  const [category, setCategory] = useState<GalleryCategory>(
    item?.category || 'UI/UX Mockups'
  );
  const [imageUrl, setImageUrl] = useState(
    item?.imageUrl ||
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85'
  );
  const [highResUrl, setHighResUrl] = useState(
    item?.highResUrl || item?.imageUrl || ''
  );
  const [resolution, setResolution] = useState(item?.resolution || '3840x2160');
  const [aspectRatio, setAspectRatio] = useState(item?.aspectRatio || '16:9');
  const [description, setDescription] = useState(
    item?.description || 'High-resolution capture with scalable UI layout.'
  );
  const [date, setDate] = useState(item?.date || '2026');
  const [tagsText, setTagsText] = useState(
    item?.tags?.join(', ') || 'UI/UX, Architecture, High-Res'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl) return;

    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      category,
      imageUrl,
      highResUrl: highResUrl || imageUrl,
      resolution: resolution.trim(),
      aspectRatio: aspectRatio.trim(),
      description: description.trim(),
      date: date.trim(),
      tags
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#161922] border border-[#2A3144] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#1C212E] border-b border-[#2A3144] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3E60D5]/20 border border-[#3E60D5]/40 flex items-center justify-center text-[#60A5FA]">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {item ? `Edit Gallery Item: ${item.title}` : 'Upload & Add High-Res Gallery Item'}
              </h2>
              <p className="text-[11px] text-slate-400">
                Supports drag-and-drop, browser upload from local device, or external image URLs.
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {/* Primary Image Upload Field */}
          <ImageUploadField
            label="Visual Gallery Asset Image"
            description="Drag and drop your file, select an image from your computer, or paste a URL."
            value={imageUrl}
            onChange={(newUrl) => {
              setImageUrl(newUrl);
              if (!highResUrl || highResUrl === imageUrl) {
                setHighResUrl(newUrl);
              }
            }}
            aspectRatioHint="Recommended 16:9, 4:3, or 1:1"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Asset Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Modern Architecture Dashboard"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
              >
                <option value="UI/UX Mockups">UI/UX Mockups</option>
                <option value="Architecture Diagrams">Architecture Diagrams</option>
                <option value="Code Snapshots">Code Snapshots</option>
                <option value="Certificates">Certificates</option>
                <option value="Workstation Setup">Workstation Setup</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description / Caption
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. High-throughput data orchestration visualization..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Resolution Spec</label>
              <input
                type="text"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                placeholder="e.g. 3840x2160"
                className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
              >
                <option value="16:9">16:9 (Widescreen)</option>
                <option value="4:3">4:3 (Standard)</option>
                <option value="1:1">1:1 (Square)</option>
                <option value="21:9">21:9 (Ultrawide)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Year / Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs focus:outline-none focus:border-[#3E60D5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="UI/UX, Architecture, High-Res, System"
              className="w-full px-3.5 py-2 rounded-xl bg-[#10131A] border border-[#272D3D] text-white text-xs font-mono focus:outline-none focus:border-[#3E60D5]"
            />
          </div>

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
              <span>{item ? 'Update Asset' : 'Save & Publish Asset'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
