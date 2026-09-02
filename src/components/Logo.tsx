import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  animated = true
}) => {
  const sizeMap = {
    sm: { height: 36, textClass: 'text-base', subClass: 'text-[9px]' },
    md: { height: 48, textClass: 'text-xl', subClass: 'text-[11px]' },
    lg: { height: 64, textClass: 'text-2xl', subClass: 'text-xs' },
    xl: { height: 84, textClass: 'text-3xl', subClass: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`} id="brand-logo-container">
      {/* Visual Circuit SVG Mark matching uploaded Developer BIJAYA Logo */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 160 160"
          className={`overflow-visible transition-transform duration-500 ${animated ? 'hover:scale-105' : ''}`}
          style={{ height: `${currentSize.height}px`, width: `${currentSize.height}px` }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Back Glow */}
          <circle cx="80" cy="80" r="45" fill="#FF7A29" fillOpacity="0.08" />

          {/* Central Connecting Arc (Soft Lavender/Indigo) */}
          <path
            d="M 68 32 A 48 48 0 0 0 68 128"
            stroke="#A78BFA"
            strokeWidth="4"
            strokeLinecap="round"
            className={animated ? 'animate-pulse' : ''}
          />

          {/* Top Orange Node Branch */}
          <path d="M 68 36 L 68 18" stroke="#FF7A29" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="68" cy="14" r="4.5" fill="#090D1A" stroke="#FF7A29" strokeWidth="3" />

          {/* Top-Diagonal Orange Node */}
          <path d="M 52 46 L 36 30" stroke="#FF7A29" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="32" cy="26" r="4.5" fill="#090D1A" stroke="#FF7A29" strokeWidth="3" />

          {/* Upper-Mid Indigo Node */}
          <path d="M 40 60 L 22 48" stroke="#6366F1" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 22 48 L 18 56" stroke="#6366F1" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="18" cy="58" r="4.5" fill="#090D1A" stroke="#6366F1" strokeWidth="3" />

          {/* Mid Left Indigo Node */}
          <path d="M 36 80 L 14 80" stroke="#4F46E5" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="10" cy="80" r="4.5" fill="#090D1A" stroke="#4F46E5" strokeWidth="3" />

          {/* Lower-Mid Orange Node */}
          <path d="M 40 100 L 14 100" stroke="#FF7A29" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="10" cy="100" r="4.5" fill="#090D1A" stroke="#FF7A29" strokeWidth="3" />

          {/* Bottom-Diagonal Lavender Node */}
          <path d="M 52 114 L 32 134" stroke="#A78BFA" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="28" cy="138" r="4.5" fill="#090D1A" stroke="#A78BFA" strokeWidth="3" />

          {/* Bottom Deep Indigo Node */}
          <path d="M 68 124 L 54 138 L 54 150" stroke="#312E81" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="54" cy="153" r="4.5" fill="#090D1A" stroke="#312E81" strokeWidth="3" />

          {/* Center Text "Developer" */}
          <text
            x="76"
            y="54"
            fill="#E2E8F0"
            fontSize="15"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="500"
            letterSpacing="0.5"
          >
            Developer
          </text>

          {/* Center Brand Name "BIJAYA" with gradient split */}
          <text
            x="76"
            y="88"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="800"
            fontSize="26"
            letterSpacing="0.8"
          >
            <tspan fill="#818CF8">BI</tspan>
            <tspan fill="#FF7A29">JAYA</tspan>
          </text>

          {/* Code Symbol </> underneath */}
          <path
            d="M 86 112 L 76 122 L 86 132"
            stroke="#6366F1"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 98 108 L 92 136"
            stroke="#FF7A29"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 104 112 L 114 122 L 104 132"
            stroke="#6366F1"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right Curly Bracket } (Orange) */}
          <path
            d="M 124 48 C 136 48 136 68 144 72 C 136 76 136 96 124 96"
            stroke="#FF7A29"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Optional Side Label for Large/Desktop Headers */}
      {showSubtitle && (
        <div className="flex flex-col justify-center text-left">
          <div className="flex items-center gap-1.5 font-extrabold tracking-tight text-white leading-none">
            <span className="text-indigo-400">BIJAYA</span>
            <span className="text-[#FF7A29]">TAMANG</span>
          </div>
          <span className={`text-slate-400 font-mono ${currentSize.subClass} font-medium mt-0.5 flex items-center gap-1`}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF7A29] animate-ping" />
            Full-Stack Developer
          </span>
        </div>
      )}
    </div>
  );
};
