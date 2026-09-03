import React, { useState, useRef } from 'react';
import {
  Upload,
  Link,
  Image as ImageIcon,
  X,
  Check,
  Sparkles,
  Eye,
  AlertCircle,
  Loader2,
  FolderOpen,
  RefreshCw
} from 'lucide-react';

export interface ImagePreset {
  label: string;
  url: string;
  category?: string;
}

export const DEFAULT_PRESET_IMAGES: ImagePreset[] = [
  {
    label: 'Cloud & System Architecture',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    category: 'Architecture'
  },
  {
    label: 'Modern Clean Code IDE',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category: 'Code'
  },
  {
    label: 'Responsive UI/UX Analytics',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    category: 'Design'
  },
  {
    label: 'AI & Data Engineering',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'AI'
  },
  {
    label: 'High-Throughput Financial Systems',
    url: 'https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1200&q=80',
    category: 'Fintech'
  },
  {
    label: 'Engineering Workspace Setup',
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    category: 'Workspace'
  }
];

interface ImageUploadFieldProps {
  value: string;
  onChange: (urlOrDataUrl: string) => void;
  label?: string;
  description?: string;
  aspectRatioHint?: string;
  presets?: ImagePreset[];
  required?: boolean;
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label = 'Cover / Image',
  description = 'Supports direct image URL, drag-and-drop file upload, or local browser file selection.',
  aspectRatioHint = 'Recommended 16:9 or 4:3 (JPG, PNG, WEBP, SVG)',
  presets = DEFAULT_PRESET_IMAGES,
  required = false,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState(value && !value.startsWith('data:') ? value : '');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync urlInput when value changes externally and is not base64
  React.useEffect(() => {
    if (value && !value.startsWith('data:')) {
      setUrlInput(value);
    }
  }, [value]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WEBP, SVG, GIF).');
      return;
    }

    // Limit to 8MB for smooth local persistence
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('Image size is too large (over 8MB). Please choose a smaller image.');
      return;
    }

    setErrorMessage(null);
    setImageLoadError(false);
    setIsLoading(true);

    const sizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    setFileDetails({
      name: file.name,
      size: sizeFormatted
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
      }
      setIsLoading(false);
    };

    reader.onerror = () => {
      setErrorMessage('Failed to read image file from your system.');
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleApplyUrl = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMessage('Please enter or paste a valid image URL');
      return;
    }
    setErrorMessage(null);
    setImageLoadError(false);
    setFileDetails(null);
    onChange(urlInput.trim());
  };

  const handleClearImage = () => {
    onChange('');
    setUrlInput('');
    setFileDetails(null);
    setImageLoadError(false);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isDataUrl = value && value.startsWith('data:');

  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Label and Helper Header */}
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <label className="block text-xs font-semibold text-slate-200">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <span className="text-[11px] text-slate-400 font-mono">{aspectRatioHint}</span>
      </div>

      {description && <p className="text-[11px] text-slate-400 -mt-1">{description}</p>}

      {/* Main Container */}
      <div className="bg-[#141824] border border-[#272D3D] rounded-xl p-3.5 space-y-3 shadow-inner">
        {/* Current Image Preview Banner / Card (if an image exists) */}
        {value ? (
          <div className="space-y-2">
            <div className="relative group rounded-xl overflow-hidden bg-[#0D1017] border border-[#2A3142] h-44 sm:h-52 flex items-center justify-center">
              {!imageLoadError ? (
                <img
                  src={value}
                  alt="Selected Preview"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  onError={() => setImageLoadError(true)}
                />
              ) : (
                <div className="p-4 text-center space-y-2 text-amber-300">
                  <AlertCircle className="w-8 h-8 mx-auto opacity-80" />
                  <p className="text-xs font-semibold">Image URL could not be loaded</p>
                  <p className="text-[11px] text-slate-400 font-mono break-all max-w-sm mx-auto">
                    {value.slice(0, 100)}...
                  </p>
                </div>
              )}

              {/* Source Badge */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-mono border border-white/10 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {isDataUrl
                    ? fileDetails
                      ? `Local File (${fileDetails.size})`
                      : 'Local Uploaded (Base64)'
                    : 'Web URL'}
                </span>
              </div>

              {/* Quick Action Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-900/90 hover:bg-indigo-800 text-white text-xs font-medium flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                  title="View full preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full View</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-medium flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                  title="Replace with new local image"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-medium flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>

            {fileDetails && (
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
                <span className="truncate max-w-[200px] sm:max-w-xs">{fileDetails.name}</span>
                <span>{fileDetails.size}</span>
              </div>
            )}
          </div>
        ) : null}

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 border-b border-[#272D3D] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-[#3E60D5] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-[#1D212E]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Drag & Drop / Browse</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-[#3E60D5] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-[#1D212E]'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>Image URL</span>
          </button>
          {presets && presets.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-[#3E60D5] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-[#1D212E]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Presets ({presets.length})</span>
            </button>
          )}
        </div>

        {/* Tab 1: Drag & Drop + Browse Files */}
        {activeTab === 'upload' && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-[#3E60D5] bg-[#3E60D5]/15 scale-[1.01]'
                : 'border-[#2D3446] hover:border-[#3E60D5]/70 bg-[#0F121C]/80 hover:bg-[#121624]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {isLoading ? (
              <div className="py-4 flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-[#3E60D5] animate-spin" />
                <span className="text-xs text-slate-300 font-medium">
                  Processing and loading image...
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#1F2538] border border-[#2D3446] flex items-center justify-center text-[#60A5FA]">
                  {isDragging ? (
                    <Upload className="w-6 h-6 animate-bounce text-[#3E60D5]" />
                  ) : (
                    <FolderOpen className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {isDragging ? 'Drop your image file now!' : 'Click to browse files or drag & drop'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports PNG, JPG, WebP, SVG, GIF (up to 8MB)
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#22283A] hover:bg-[#2A3249] text-[#60A5FA] text-xs font-semibold border border-[#323B53]">
                    <Upload className="w-3.5 h-3.5" />
                    Browse from Device
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Direct Image URL */}
        {activeTab === 'url' && (
          <div className="space-y-2.5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or https://example.com/image.jpg"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setErrorMessage(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleApplyUrl();
                    }
                  }}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0F121C] border border-[#272D3D] text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-[#3E60D5]"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2 rounded-xl bg-[#3E60D5] hover:bg-[#3251bf] text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                Apply URL
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              Paste any public CDN, Unsplash, GitHub asset, or web-hosted image URL.
            </p>
          </div>
        )}

        {/* Tab 3: Curated High-Res Presets */}
        {activeTab === 'presets' && presets && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1 custom-scrollbar">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(preset.url);
                  setUrlInput(preset.url);
                  setFileDetails(null);
                  setImageLoadError(false);
                }}
                className={`group relative rounded-lg overflow-hidden border text-left p-1 transition-all cursor-pointer ${
                  value === preset.url
                    ? 'border-[#3E60D5] ring-2 ring-[#3E60D5]/40 bg-[#1A2238]'
                    : 'border-[#272D3D] hover:border-slate-500 bg-[#0F121C]'
                }`}
              >
                <div className="h-16 rounded overflow-hidden relative bg-slate-900">
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  {value === preset.url && (
                    <div className="absolute inset-0 bg-[#3E60D5]/40 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white drop-shadow" />
                    </div>
                  )}
                </div>
                <div className="mt-1 px-1">
                  <span className="block text-[10px] font-semibold text-slate-200 truncate">
                    {preset.label}
                  </span>
                  {preset.category && (
                    <span className="text-[9px] text-slate-400 font-mono">
                      {preset.category}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Error message notification */}
        {errorMessage && (
          <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Full Lightbox Preview Modal */}
      {isPreviewOpen && value && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] bg-[#111420] border border-[#272D3D] rounded-2xl p-2 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#272D3D]">
              <span className="text-xs font-bold text-white font-mono">Full-Scale Image Inspection</span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 overflow-auto max-h-[75vh] flex items-center justify-center">
              <img src={value} alt="Expanded View" className="max-w-full max-h-[70vh] rounded-lg object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
