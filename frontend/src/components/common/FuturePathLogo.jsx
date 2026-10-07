import React from 'react';

/**
 * Future Path Official Brand Logo
 * Represents:
 * - Education (Knowledge cornerstone & structural arch)
 * - Growth & Career Journey (Dynamic ascending pathway)
 * - Career Direction (Perspective guidance lines)
 * - Future Opportunities (Radiant beacon / North star)
 */
export const FuturePathLogo = ({
  iconOnly = false,
  size = 38,
  className = '',
  textColor = 'text-slate-900',
  showTagline = false
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon (36px - 44px) */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="fp-nav-primary" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="fp-nav-path" x1="12" y1="38" x2="36" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="fp-nav-shadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#4F46E5" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* Base Rounded Brand Shield */}
        <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#fp-nav-primary)" filter="url(#fp-nav-shadow)" />

        {/* Academic Arch (Education foundation) */}
        <path d="M10 34C13 31 18 29 24 29C30 29 35 31 38 34" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="2" strokeLinecap="round" />
        
        {/* Knowledge Cornerstone Base */}
        <path d="M14 36L24 31L34 36L24 41L14 36Z" fill="rgba(255, 255, 255, 0.16)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.2" strokeLinejoin="round" />

        {/* The Ascending Career Pathway */}
        <path d="M17 38C19 28 22 22 28 17C31 14.5 33 13 35 12" stroke="url(#fp-nav-path)" strokeWidth="3.5" strokeLinecap="round" />
        
        {/* Pathway Guidance Line */}
        <path d="M21 37C23 29 25 24 30 19" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 3" opacity="0.9" />

        {/* Radiant Star (Future Opportunities) */}
        <g transform="translate(35, 12)">
          <path d="M0 -6L1.6 -1.6L6 0L1.6 1.6L0 6L-1.6 1.6L-6 0L-1.6 -1.6Z" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="1.5" fill="#38BDF8" />
        </g>

        {/* Career Waypoints */}
        <circle cx="21" cy="27" r="1.8" fill="#06B6D4" />
        <circle cx="26" cy="21" r="1.8" fill="#38BDF8" />
      </svg>

      {/* Brand Wordmark */}
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight font-extrabold text-[1.18rem] leading-none">
            <span className={textColor}>Future</span>
            <span className="text-indigo-600 ml-1">Path</span>
          </div>
          {showTagline && (
            <span className="text-[10px] text-slate-500 font-medium tracking-tight mt-0.5">
              Your Education. Your Choices. Your Future.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
