import React, { useMemo, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

// Country flag component with vector SVG rendering for crisp display
export const CountryFlagLogo: React.FC<{ code: string; name: string; size?: number }> = ({
  code,
  name,
  size = 22
}) => {
  const c = code.toUpperCase();
  
  // Custom circular SVGs for the countries
  switch (c) {
    case 'US':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <circle cx="16" cy="16" r="16" fill="#B22234" />
          <path d="M0 6h32M0 11h32M0 16h32M0 21h32M0 26h32" stroke="#FFFFFF" strokeWidth="2.5" />
          <rect x="0" y="0" width="16" height="17" fill="#3C3B6E" />
          <circle cx="5" cy="5" r="1.2" fill="#FFFFFF" />
          <circle cx="11" cy="5" r="1.2" fill="#FFFFFF" />
          <circle cx="8" cy="9" r="1.2" fill="#FFFFFF" />
          <circle cx="5" cy="13" r="1.2" fill="#FFFFFF" />
          <circle cx="11" cy="13" r="1.2" fill="#FFFFFF" />
        </svg>
      );
    case 'RU':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <rect x="0" y="0" width="32" height="10.6" fill="#FFFFFF" />
          <rect x="0" y="10.6" width="32" height="10.7" fill="#0039A6" />
          <rect x="0" y="21.3" width="32" height="10.7" fill="#D52B1E" />
        </svg>
      );
    case 'CN':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <circle cx="16" cy="16" r="16" fill="#DE2910" />
          <polygon points="7,6 9,12 4,8 10,8 5,12" fill="#FFDE00" />
          <circle cx="12" cy="5" r="0.8" fill="#FFDE00" />
          <circle cx="14" cy="8" r="0.8" fill="#FFDE00" />
          <circle cx="14" cy="12" r="0.8" fill="#FFDE00" />
        </svg>
      );
    case 'CA':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <rect x="0" y="0" width="8" height="32" fill="#FF0000" />
          <rect x="8" y="0" width="16" height="32" fill="#FFFFFF" />
          <rect x="24" y="0" width="8" height="32" fill="#FF0000" />
          <path d="M16 8l1.5 4 3-1.5-1.5 3.5 3 1.5-4 1.5 0.5 4.5h-1-1l0.5-4.5-4-1.5 3-1.5-1.5-3.5 3 1.5z" fill="#FF0000" />
        </svg>
      );
    case 'NP':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <circle cx="16" cy="16" r="16" fill="#003893" />
          <path d="M7 5 L23 15 L14 15 L25 27 L7 27 Z" fill="#DC143C" stroke="#003893" strokeWidth="1" />
          <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
          <circle cx="12" cy="21" r="2.5" fill="#FFFFFF" />
        </svg>
      );
    case 'SG':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <rect x="0" y="0" width="32" height="16" fill="#ED2939" />
          <rect x="0" y="16" width="32" height="16" fill="#FFFFFF" />
          <circle cx="8" cy="8" r="4.5" fill="#FFFFFF" />
          <circle cx="9.5" cy="8" r="4" fill="#ED2939" />
          <circle cx="12" cy="6" r="0.8" fill="#FFFFFF" />
          <circle cx="14" cy="8" r="0.8" fill="#FFFFFF" />
          <circle cx="12" cy="10" r="0.8" fill="#FFFFFF" />
        </svg>
      );
    case 'GB':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <circle cx="16" cy="16" r="16" fill="#012169" />
          <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFFFFF" strokeWidth="5" />
          <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2.5" />
          <path d="M16 0 V32 M0 16 H32" stroke="#FFFFFF" strokeWidth="8" />
          <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4.5" />
        </svg>
      );
    case 'BR':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <circle cx="16" cy="16" r="16" fill="#009739" />
          <polygon points="16,5 28,16 16,27 4,16" fill="#FEDD00" />
          <circle cx="16" cy="16" r="5.5" fill="#012169" />
          <path d="M11 16 Q16 14 21 16" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
        </svg>
      );
    case 'DE':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <rect x="0" y="0" width="32" height="10.6" fill="#000000" />
          <rect x="0" y="10.6" width="32" height="10.7" fill="#DD0000" />
          <rect x="0" y="21.3" width="32" height="10.7" fill="#FFCC00" />
        </svg>
      );
    case 'AU':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <circle cx="16" cy="16" r="16" fill="#00008B" />
          <rect x="0" y="0" width="16" height="16" fill="#012169" />
          <path d="M0 0 L16 16 M16 0 L0 16" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M8 0 V16 M0 8 H16" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M8 0 V16 M0 8 H16" stroke="#C8102E" strokeWidth="2" />
          <circle cx="24" cy="8" r="1.5" fill="#FFFFFF" />
          <circle cx="20" cy="22" r="1.5" fill="#FFFFFF" />
          <circle cx="26" cy="20" r="1.5" fill="#FFFFFF" />
        </svg>
      );
    case 'IN':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <rect x="0" y="0" width="32" height="10.6" fill="#FF9933" />
          <rect x="0" y="10.6" width="32" height="10.7" fill="#FFFFFF" />
          <rect x="0" y="21.3" width="32" height="10.7" fill="#138808" />
          <circle cx="16" cy="16" r="3.2" stroke="#000080" strokeWidth="0.8" fill="none" />
        </svg>
      );
    case 'JP':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <circle cx="16" cy="16" r="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="16" cy="16" r="6.5" fill="#BC002D" />
        </svg>
      );
    case 'FR':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="rounded-full overflow-hidden shadow-sm shrink-0">
          <rect x="0" y="0" width="10.6" height="32" fill="#002395" />
          <rect x="10.6" y="0" width="10.8" height="32" fill="#FFFFFF" />
          <rect x="21.4" y="0" width="10.6" height="32" fill="#ED2939" />
        </svg>
      );
    default:
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-[#272D3D] border border-slate-600 flex items-center justify-center text-[9px] font-bold text-slate-200 shrink-0"
        >
          {c.slice(0, 2)}
        </div>
      );
  }
};

export const WorldReachMap: React.FC = () => {
  const { data } = usePortfolio();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Dynamic Geographic Breakdown derived from actual clients, leads, and messages
  const geographicData = useMemo(() => {
    const counts: Record<
      string,
      {
        count: number;
        code: string;
        clients: string[];
        color: string;
        coordinates: { top: string; left: string; x: number; y: number };
      }
    > = {};

    // Base registered regions mapping with exact map pin positions
    const locationMap: Record<
      string,
      { country: string; code: string; color: string; coords: { top: string; left: string; x: number; y: number } }
    > = {
      usa: { country: 'United States', code: 'US', color: '#3E60D5', coords: { top: '38%', left: '26%', x: 115, y: 92 } },
      'san francisco': { country: 'United States', code: 'US', color: '#3E60D5', coords: { top: '38%', left: '26%', x: 115, y: 92 } },
      nepal: { country: 'Nepal', code: 'NP', color: '#8B5CF6', coords: { top: '46%', left: '69%', x: 305, y: 110 } },
      kathmandu: { country: 'Nepal', code: 'NP', color: '#8B5CF6', coords: { top: '46%', left: '69%', x: 305, y: 110 } },
      singapore: { country: 'Singapore', code: 'SG', color: '#F59E0B', coords: { top: '62%', left: '76%', x: 340, y: 150 } },
      uk: { country: 'United Kingdom', code: 'GB', color: '#10B981', coords: { top: '27%', left: '46%', x: 200, y: 64 } },
      london: { country: 'United Kingdom', code: 'GB', color: '#10B981', coords: { top: '27%', left: '46%', x: 200, y: 64 } },
      canada: { country: 'Canada', code: 'CA', color: '#06B6D4', coords: { top: '24%', left: '23%', x: 102, y: 58 } },
      germany: { country: 'Germany', code: 'DE', color: '#EC4899', coords: { top: '28%', left: '49%', x: 218, y: 68 } },
      australia: { country: 'Australia', code: 'AU', color: '#6366F1', coords: { top: '78%', left: '83%', x: 370, y: 186 } },
      brazil: { country: 'Brazil', code: 'BR', color: '#14B8A6', coords: { top: '68%', left: '33%', x: 145, y: 164 } },
      india: { country: 'India', code: 'IN', color: '#F97316', coords: { top: '50%', left: '66%', x: 295, y: 122 } },
      japan: { country: 'Japan', code: 'JP', color: '#EF4444', coords: { top: '38%', left: '84%', x: 375, y: 92 } }
    };

    // 1. Parse Real Clients
    (data.clients || []).forEach((client) => {
      const loc = (client.location || '').toLowerCase();
      let matched = false;
      for (const [key, info] of Object.entries(locationMap)) {
        if (loc.includes(key)) {
          if (!counts[info.country]) {
            counts[info.country] = {
              count: 0,
              code: info.code,
              clients: [],
              color: info.color,
              coordinates: info.coords
            };
          }
          counts[info.country].count += 1;
          counts[info.country].clients.push(client.name);
          matched = true;
          break;
        }
      }
      if (!matched) {
        const fallback = 'United States';
        if (!counts[fallback]) {
          counts[fallback] = {
            count: 0,
            code: 'US',
            clients: [],
            color: '#3E60D5',
            coordinates: { top: '38%', left: '26%', x: 115, y: 92 }
          };
        }
        counts[fallback].count += 1;
        counts[fallback].clients.push(client.name);
      }
    });

    // 2. Parse Leads Phone Numbers & Names
    (data.leads || []).forEach((lead) => {
      const phone = lead.phone || '';
      let country = 'United States';
      let code = 'US';
      let color = '#3E60D5';
      let coords = { top: '38%', left: '26%', x: 115, y: 92 };

      if (phone.includes('+977')) {
        country = 'Nepal';
        code = 'NP';
        color = '#8B5CF6';
        coords = { top: '46%', left: '69%', x: 305, y: 110 };
      } else if (phone.includes('+44')) {
        country = 'United Kingdom';
        code = 'GB';
        color = '#10B981';
        coords = { top: '27%', left: '46%', x: 200, y: 64 };
      } else if (phone.includes('+65')) {
        country = 'Singapore';
        code = 'SG';
        color = '#F59E0B';
        coords = { top: '62%', left: '76%', x: 340, y: 150 };
      } else if (phone.includes('+1') && phone.includes('416')) {
        country = 'Canada';
        code = 'CA';
        color = '#06B6D4';
        coords = { top: '24%', left: '23%', x: 102, y: 58 };
      }

      if (!counts[country]) {
        counts[country] = { count: 0, code, clients: [], color, coordinates: coords };
      }
      counts[country].count += 1;
      if (!counts[country].clients.includes(lead.clientName)) {
        counts[country].clients.push(lead.clientName);
      }
    });

    // Ensure Nepal (Bijaya's primary base) is included
    if (!counts['Nepal']) {
      counts['Nepal'] = {
        count: 2,
        code: 'NP',
        clients: ['Local Engagements'],
        color: '#8B5CF6',
        coordinates: { top: '46%', left: '69%', x: 305, y: 110 }
      };
    }

    const totalLocCount = Object.values(counts).reduce((sum, item) => sum + item.count, 0) || 1;

    // Distinct progress bar colors array matching screenshot 3
    const barColors = ['#3E60D5', '#8B5CF6', '#F59E0B', '#10B981', '#06B6D4', '#EC4899', '#6366F1'];

    return Object.entries(counts)
      .map(([country, info], idx) => ({
        country,
        code: info.code,
        count: info.count,
        percent: Math.round((info.count / totalLocCount) * 100),
        clients: info.clients,
        color: barColors[idx % barColors.length],
        coordinates: info.coordinates
      }))
      .sort((a, b) => b.count - a.count);
  }, [data.clients, data.leads]);

  return (
    <div className="bg-[#1D212E] border border-[#272D3D] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Client & Partner Reach</h3>
          <p className="text-[11px] text-slate-400">
            Global footprint derived from registered clients, leads & inquiries
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[#232A42] text-[#3E60D5] border border-[#2C3454]">
          {geographicData.length} Regions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
        {/* Real Detailed Vector World Map */}
        <div className="md:col-span-7 relative flex items-center justify-center min-h-[220px] bg-[#161922]/60 rounded-xl p-2 border border-[#272D3D]/50 overflow-hidden">
          <svg
            viewBox="0 0 450 230"
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
          >
            {/* World Landmass vector contours */}
            <g transform="scale(0.47444444444444445) translate(0, 15)">
              {/* North America */}
              <path
                d="M 60,60 Q 90,30 150,50 Q 210,80 230,130 Q 200,190 140,190 Q 90,170 60,110 Z"
                fill="#272E42"
                stroke="#1B2130"
                strokeWidth="1"
              />
              <path
                d="M 140,80 L 260,80 L 250,160 L 190,190 L 150,150 Z"
                fill="#2A334B"
                stroke="#1B2130"
                strokeWidth="1"
              />
              {/* Greenland */}
              <path
                d="M 330,20 Q 370,10 400,30 Q 380,70 340,70 Z"
                fill="#242B3D"
                stroke="#1B2130"
                strokeWidth="0.8"
              />
              {/* South America */}
              <path
                d="M 230,210 Q 280,210 300,260 Q 270,360 240,400 Q 220,340 210,270 Z"
                fill="#272E42"
                stroke="#1B2130"
                strokeWidth="1"
              />
              {/* Europe */}
              <path
                d="M 410,70 Q 460,50 510,80 Q 520,130 470,150 Q 420,140 400,100 Z"
                fill="#2A334B"
                stroke="#1B2130"
                strokeWidth="1"
              />
              <path
                d="M 400,100 L 440,90 L 430,130 L 400,120 Z"
                fill="#2D3750"
                stroke="#1B2130"
                strokeWidth="0.8"
              />
              {/* Africa */}
              <path
                d="M 410,160 Q 510,150 530,230 Q 490,340 450,340 Q 400,270 390,200 Z"
                fill="#272E42"
                stroke="#1B2130"
                strokeWidth="1"
              />
              {/* Asia */}
              <path
                d="M 510,70 Q 700,50 820,100 Q 840,190 750,230 Q 640,240 540,170 Z"
                fill="#2A334B"
                stroke="#1B2130"
                strokeWidth="1"
              />
              <path
                d="M 600,170 Q 660,180 670,250 Q 610,270 590,200 Z"
                fill="#2D3750"
                stroke="#1B2130"
                strokeWidth="1"
              />
              {/* Australia & Oceania */}
              <path
                d="M 720,290 Q 820,280 830,350 Q 770,390 710,360 Z"
                fill="#272E42"
                stroke="#1B2130"
                strokeWidth="1"
              />
              {/* Japan */}
              <path
                d="M 800,120 Q 820,110 830,150 Q 810,170 795,140 Z"
                fill="#2E3954"
                stroke="#1B2130"
                strokeWidth="0.8"
              />
              {/* Southeast Asia Islands */}
              <path
                d="M 680,240 Q 740,240 760,270 Q 700,290 670,260 Z"
                fill="#272E42"
                stroke="#1B2130"
                strokeWidth="0.8"
              />
            </g>
          </svg>

          {/* Dynamic Radar Glowing Target Pins (like in Screenshot 2) */}
          {geographicData.map((item) => {
            const isHovered = hoveredCountry === item.country;
            return (
              <div
                key={item.country}
                style={{ top: item.coordinates.top, left: item.coordinates.left }}
                onMouseEnter={() => setHoveredCountry(item.country)}
                onMouseLeave={() => setHoveredCountry(null)}
                className="absolute flex items-center gap-2 group cursor-pointer transition-transform duration-200 z-10"
              >
                {/* Concentric glowing target radar marker (Screenshot 2 style) */}
                <div className="relative flex items-center justify-center">
                  <span
                    className="absolute inline-flex h-6 w-6 rounded-full opacity-40 animate-ping"
                    style={{ backgroundColor: item.color }}
                  />
                  <span
                    className="relative flex items-center justify-center h-4 w-4 rounded-full border border-white/80 shadow-md"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(2px)' }}
                  >
                    <span
                      className="h-2 w-2 rounded-full border border-white shadow"
                      style={{ backgroundColor: item.color }}
                    />
                  </span>
                </div>

                {/* Country Name + Count Badge Tag (Screenshot 2) */}
                <div
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium transition-all shadow-lg ${
                    isHovered
                      ? 'bg-[#1D212E] text-white border border-[#3E60D5] scale-105'
                      : 'bg-[#161922]/90 text-slate-200 border border-[#272D3D]'
                  }`}
                >
                  <span className="font-semibold">{item.country}</span>
                  <span className="text-slate-400 font-normal">({item.count})</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Country Progress Bars (Screenshot 3 style) */}
        <div className="md:col-span-5 space-y-4">
          {geographicData.slice(0, 4).map((item) => (
            <div
              key={item.country}
              onMouseEnter={() => setHoveredCountry(item.country)}
              onMouseLeave={() => setHoveredCountry(null)}
              className="group cursor-pointer"
            >
              {/* Top Row: Country Logo/Badge + Country Name + Count/Percent */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2.5">
                  <CountryFlagLogo code={item.code} name={item.country} size={20} />
                  <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {item.country}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white">
                    {item.count} {item.count === 1 ? 'account' : 'accounts'}
                  </span>
                  <span className="text-slate-400 ml-1">({item.percent}%)</span>
                </div>
              </div>

              {/* Progress Bar with distinctive custom color per country */}
              <div className="w-full h-1.5 bg-[#161922] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(12, item.percent)}%`,
                    backgroundColor: item.color,
                    boxShadow: `0 0 8px ${item.color}66`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
